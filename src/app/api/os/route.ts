import os from "os";
export async function GET() {
	const hostname = os.hostname();
	return new Response(JSON.stringify({ hostname }), {
		headers: {
			"Content-Type": "application/json",
		},
	});
}
