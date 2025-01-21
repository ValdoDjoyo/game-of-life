"use client";
import React, { useEffect, useState } from "react";
export default function page() {
	const [hostname, setHostname] = useState("");
	useEffect(() => {
		const fetchHostname = async () => {
			const response = await fetch("/api/os");
			const data = await response.json();
			setHostname(data.hostname);
            console.log(data);
		};
		fetchHostname();
	}, []);
	return (
		<div>
			<h1>Voici les informations de ma machine</h1>
			<p>Nom de la machine : {hostname}</p>
		</div>
	);
}