import os from "os";

export async function GET() {
	const hostname = os.hostname(); // Nom de l'ordinateur
	const platform = os.platform(); // Plateforme (win32, linux, darwin, etc.)
	const type = os.type(); // Type d'OS (Windows_NT, Linux, Darwin, etc.)
	const release = os.release(); // Version de l'OS
	const arch = os.arch(); // Architecture (x64, arm64, etc.)
	const cpus = os.cpus(); // Liste des processeurs
	const totalMem = os.totalmem(); // Mémoire totale en octets
	const freeMem = os.freemem(); // Mémoire libre en octets
	const uptime = os.uptime(); // Temps de fonctionnement en secondes
	const networkInterfaces = os.networkInterfaces(); // Interfaces réseau
	const homeDir = os.homedir(); // Répertoire utilisateur
	const tempDir = os.tmpdir(); // Répertoire temporaire

	// Formatage des données pour un retour propre
	const data = {
		hostname,
		platform,
		type,
		release,
		arch,
		cpus: cpus.map((cpu) => ({
			model: cpu.model,
			speed: cpu.speed,
		})),
		totalMem: `${(totalMem / 1024 / 1024).toFixed(2)} MB`,
		freeMem: `${(freeMem / 1024 / 1024).toFixed(2)} MB`,
		uptime: `${(uptime / 3600).toFixed(2)} hours`,
		networkInterfaces,
		homeDir,
		tempDir,
	};

	return new Response(JSON.stringify({ data }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
