// build-media.js (Versão 2.1)
// Gera um JSON com objetos para cada foto e vídeo.

const fs = require('fs');
const path = require('path');

const fotosDir = path.join(__dirname, 'fotos');
const videosDir = path.join(__dirname, 'videos');
const outputJsonPath = path.join(__dirname, 'midia.json');

const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const videoExtensions = ['.mp4', '.webm', '.mov', '.ogg'];

const sampleDescriptions = ["Uma paisagem deslumbrante.", "Retrato urbano.", "Detalhes da natureza.", "Arquitetura moderna.", "Momento espontâneo.", "Beleza serena."];
const sampleVideoTitles = ["Aventura na Cidade", "Paz na Montanha", "Clipe Dinâmico", "Curta Experimental", "Vlog do Dia", "Registro de Viagem"];

function getRandomDate() {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 365);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}

try {
    const photoFiles = fs.readdirSync(fotosDir)
        .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
        .map((file, index) => ({
            type: 'photo',
            filename: file,
            description: sampleDescriptions[index % sampleDescriptions.length],
            date: getRandomDate()
        }));

    const videoFiles = fs.readdirSync(videosDir)
        .filter(file => videoExtensions.includes(path.extname(file).toLowerCase()))
        .map((file, index) => ({
            type: 'video',
            filename: file,
            title: sampleVideoTitles[index % sampleVideoTitles.length],
            duration: "00:45", // Duração fictícia
            date: getRandomDate(),
            downloadable: index % 2 === 0 // Torna metade dos vídeos baixáveis para o exemplo
        }));

    let allMedia = [...photoFiles, ...videoFiles].sort(() => Math.random() - 0.5); 

    fs.writeFileSync(outputJsonPath, JSON.stringify(allMedia, null, 2), 'utf8');
    console.log(`Sucesso! 'midia.json' foi criado com ${photoFiles.length} fotos e ${videoFiles.length} vídeos.`);

} catch (error) {
    console.error("Erro ao gerar 'midia.json':", error.message);
    if (!fs.existsSync(outputJsonPath)) {
        fs.writeFileSync(outputJsonPath, '[]', 'utf8');
    }
}