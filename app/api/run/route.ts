export const runtime = "nodejs"; // ✅ VERY IMPORTANT

export async function POST(req: Request) {
  try {
    const body = await req.json();

    return Response.json({
      output: "API Working ✅",
    });
  } catch (err) {
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}