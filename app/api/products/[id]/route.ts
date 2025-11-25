import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    sessionToken: process.env.AWS_SESSION_TOKEN!,
  },
});

export async function GET(_: Request, { params }: any) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) }
  });

  return NextResponse.json(product);
}

export async function PUT(req: Request, context: { params: PromiseLike<{ id: any; }> | { id: any; }; }) {
  try {
    const { id } = await context.params;

    const productId = Number(id);

    if (isNaN(productId)) {
        return Response.json({ error: "invalid id" }, { status: 400 });
    }

    const form = await req.formData();
    const name = String(form.get("name") || "");
    const price = Number(form.get("price"));
    const desc = form.get("desc") ? String(form.get("desc")) : "";

    const oldImageUrl = form.get("oldImageUrl") || null;
    const file = form.get("file");

    let newImageUrl = oldImageUrl;

    // jika user upload file baru
    if (file && typeof file === "object") {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // 1. hapus file lama
      if (oldImageUrl) {
        const oldKey = oldImageUrl.toString().split("/").pop();
        try {
            await s3.send(
                new DeleteObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET!,
                Key: oldKey,
                })
            );
            console.log("DELETE SUCCESS:", oldKey);
        } catch (e) {
            console.error("DELETE ERROR:", e);
        }
      }

      // 2. upload file baru
      const ext = file.name.split(".").pop();
      const filename = `product-${Date.now()}.${ext}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET!,
          Key: filename,
          Body: buffer,
          ContentType: file.type,
        })
      );

      newImageUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
    }

    // 3. update database
    const updated = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        price,
        desc,
        imageUrl: newImageUrl,
    },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Update product error:", err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const productId = Number(id);

  if (isNaN(productId)) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }

  // 1. Ambil produk
  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // 2. Hapus file di S3 jika ada
  if (product.imageUrl) {
    const key = product.imageUrl.split("/").pop();

    try {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET!,
          Key: key!,
        })
      );
      console.log("DELETE S3 SUCCESS:", key);
    } catch (err) {
      console.error("DELETE S3 ERROR:", err);
      // tidak return error, tetap lanjut hapus database
    }
  }

  // 3. Hapus database
  await prisma.product.delete({
    where: { id: productId }
  });

  return NextResponse.json({ message: "Deleted" });
}

