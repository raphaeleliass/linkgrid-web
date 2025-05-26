import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await revalidateTag("user-fetch");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Error revalidating" }, { status: 500 });
  }
}
