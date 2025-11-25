import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: any) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) }
  });

  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: any) {
  const data = await req.json();

  const product = await prisma.product.update({
    where: { id: Number(params.id) },
    data,
  });

  return NextResponse.json(product);
}

export async function DELETE(_: Request, { params }: any) {
  await prisma.product.delete({
    where: { id: Number(params.id) }
  });

  return NextResponse.json({ message: "Deleted" });
}
