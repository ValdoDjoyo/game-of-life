import os from "os";
export async function GET() {
	const hostname = os.hostname();
    const keyboard = os.platform();
    const type = os.type();
    const release = os.release();
    const data = {
		hostname,
		keyboard,
		type,
		release,
	};
	return new Response(JSON.stringify({ data }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
