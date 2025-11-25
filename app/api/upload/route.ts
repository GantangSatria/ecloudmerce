import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  //endpoint: process.env.S3_ENDPOINT || undefined, 
  //forcePathStyle: !!process.env.S3_ENDPOINT,     
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    sessionToken: process.env.AWS_SESSION_TOKEN!,
  },
});

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file) {
      return new NextResponse("No file", { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop();
    const filename = `product-${Date.now()}.${ext}`;

    const result = await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: filename,
        Body: buffer,
        ContentType: file.type,
      })
    );

    console.log("S3 RESULT:", result);

    const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;

    return NextResponse.json({ url });

  } catch (err) {
    console.error("S3 ERROR:", err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}

