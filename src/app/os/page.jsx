"use client";

import React, { useEffect, useState } from "react";

export default function Page() {
	const [data, setData] = useState(null); // Données système
	const [keyboard, setKeyboard] = useState(""); // Langue du clavier

	useEffect(() => {
		// Appeler l'API pour récupérer les données système
		const fetchSystemInfo = async () => {
			const response = await fetch("/api/os");
			const result = await response.json();
			setData(result.data);
		};

		// Récupérer la langue du clavier
		setKeyboard(navigator.language);

		fetchSystemInfo();
	}, []);

	if (!data) {
		return <p>Chargement des informations...</p>;
	}

	return (
		<div>
			<h1>Voici les informations de ma machine</h1>
			<p>Nom de la machine : {data.hostname}</p>
			<p>Plateforme : {data.platform}</p>
			<p>Type d'OS : {data.type}</p>
			<p>Version : {data.release}</p>
			<p>Architecture : {data.arch}</p>
			<p>
				Mémoire totale : {(data.totalMem / 1024 / 1024).toFixed(2)} MB
			</p>
			<p>
				Mémoire libre : {(data.freeMem / 1024 / 1024).toFixed(2)} MB
			</p>
			<p>
				Temps de fonctionnement : {(data.uptime / 3600).toFixed(2)}{" "}
				heures
			</p>
			<p>Clavier de la machine : {keyboard}</p>
			<p>Répertoire utilisateur : {data.homeDir}</p>
			<p>Répertoire temporaire : {data.tempDir}</p>

			<h2>Processeurs :</h2>
			<ul>
				{data.cpus.map((cpu, index) => (
					<li key={index}>
						Modèle : {cpu.model}, Vitesse : {cpu.speed} MHz
					</li>
				))}
			</ul>

			<h2>Interfaces réseau :</h2>
			<ul>
				{Object.entries(data.networkInterfaces).map(
					([name, interfaces]) => (
						<li key={name}>
							<strong>{name} :</strong>
							<ul>
								{interfaces.map((iface, idx) => (
									<li key={idx}>
										Adresse : {iface.address}, Famille :{" "}
										{iface.family}, Netmask : {iface.netmask}
									</li>
								))}
							</ul>
						</li>
					)
				)}
			</ul>
		</div>
	);
}
