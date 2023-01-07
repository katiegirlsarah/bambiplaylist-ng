const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const names = [
	'00 Rapid Induction',
	'01 Bubble Induction',
	'02 Bubble Acceptance',
	'03 Bambi Named and Drained',
	'04 Bambi IQ Lock',
	'05 Bambi Body Lock',
	'06 Bambi Attitude Lock',
	'07 Bambi Uniformed',
	'08 Bambi Takeover',
	'09 Bambi Cockslut',
	'10 Bambi Awakens',
	'01 Blank Mindless Doll',
	'02 Cock Dumb Hole',
	'03 Uniform Slut Puppet',
	'04 Vain Horny Happy',
	'05 Bimbo Drift',
	'01 Fake Plastic Fuckpuppet',
	'02 Designer Pleasure Puppet',
	'03 Bimbo Fuckpuppet Oblivion',
	'01 Blowup Pleasure Toy',
	'02 Perfect Bimbo Maid',
	'03 Restrained and Milked',
	'01 Bimbo Giggletime',
	'02 Mindlocked Cock Zombie',
	'00 Bimbo Drone',
	'01 Bimbo Relaxation',
	'02 Bimbo Mindwipe',
	'03 Bimbo Slumber',
	'04 Bimbo Tranquility',
	'05 Bimbo Pride',
	'06 Bimbo Pleasure',
	'07 Bimbo Servitude',
	'08 Bimbo Addiction',
	'09 Bimbo Amnesia',
	'10 Bimbo Protection',
	'01 Sleepygirl Salon',
	'02 Mentally Platinum Blonde',
	'03 Automatic Airhead',
	'04 Superficial Basic Bitch',
	'05 Life Control Total Doll',
	'07 Makeover Awakener',
	'01 Sleepyhead',
	'02 Bobblehead',
	'03 Bambidoll',
	'04 Giggledoll',
	'05 Ohmigod',
	'06 Ziplock'
];

app.get('/', (req, res) => {
	let files = req.query.p
		.split(',')
		.map((x) => path.join(__dirname, `files/${names[parseInt(x - 1)]}.mp3`));
	files = files.map((x) => Buffer.from(fs.readFileSync(x)));
	files = Buffer.concat(files);

	const audioBlob = new Blob([files], { type: 'audio/mpeg' });

	const range = req.headers.range;

	const parts = range.replace(/bytes=/, '').split('-');
	const start = parseInt(parts[0], 10);
	const end = parts[1] ? parseInt(parts[1], 10) : audioBlob.size - 1;

	const audioRangeBlob = audioBlob.slice(start, end);
	const chunksize = end - start + 1;

	res.status(206);
	res.set({
		'Content-Range': `bytes ${start}-${end}/${audioBlob.size}`,
		'Content-Lenght': chunksize,
		'Accept-Ranges': 'bytes',
		'Content-Type': 'audio/mpeg'
	});

	res.type(audioRangeBlob.type);
	audioRangeBlob.arrayBuffer().then((buf) => {
		res.send(Buffer.from(buf));
	});
});

app.get('/files', (req, res) => {
	res.send(JSON.stringify(names));
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
