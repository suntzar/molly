// loc-ft.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const fotosDir = path.join(__dirname, 'Fotos');
const outputFile = path.join(__dirname, 'fotos.json');

// Tags de exemplo para serem distribuídas aleatoriamente
const sampleTags = [
    "digital_art", "concept_art", "illustration", "character_design", "fantasy",
    "sci-fi", "landscape", "portrait", "anime_style", "vibrant_colors",
    "dark_theme", "minimalist", "surreal", "photorealistic", "abstract"
];

try {
    const files = fs.readdirSync(fotosDir).filter(file =>
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    const photosData = files.map(file => {
        // Gera um ID único baseado no nome do arquivo para consistência
        const id = crypto.createHash('md5').update(file).digest('hex').substring(0, 12);
        
        // Seleciona de 2 a 5 tags aleatórias para cada imagem
        const numTags = Math.floor(Math.random() * 4) + 2;
        const shuffledTags = sampleTags.sort(() => 0.5 - Math.random());
        const tags = shuffledTags.slice(0, numTags);

        return {
            id: id,
            filename: file,
            tags: tags,
            author: "Artista Desconhecido" // Placeholder
        };
    });

    fs.writeFileSync(outputFile, JSON.stringify(photosData, null, 2));

    console.log(`✅ Sucesso! O arquivo fotos.json foi criado com ${photosData.length} imagens.`);

} catch (error) {
    console.error("❌ Erro ao processar as fotos:", error);
    if (error.code === 'ENOENT') {
        console.error("👉 Certifique-se de que a pasta 'fotos' existe no mesmo diretório que este script.");
    }
}