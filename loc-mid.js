// generate-media-json.js (Versão 2.0 - Suporta Fotos e Vídeos)

const fs = require('fs');
const path = require('path');

const fotosDir = path.join(__dirname, 'Fotos');
const videosDir = path.join(__dirname, 'Videos');
const outputJsonPath = path.join(__dirname, 'media.json');

const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const videoExtensions = ['.mp4', '.webm', '.mov', '.ogv'];

// Tags de exemplo para uma busca mais interessante
const sampleTags = ['fantasy', 'sci-fi', 'nature', 'city', 'abstract', 'dark', 'light', 'portrait', 'landscape', 'cyberpunk'];

function getFilesFromDir(dir, extensions) {
    if (!fs.existsSync(dir)) {
        console.warn(`Diretório não encontrado, pulando: ${dir}`);
        return [];
    }
    return fs.readdirSync(dir).filter(file => extensions.includes(path.extname(file).toLowerCase()));
}

try {
    const imageFiles = getFilesFromDir(fotosDir, imageExtensions).map(file => ({
        filename: file,
        type: 'image'
    }));

    const videoFiles = getFilesFromDir(videosDir, videoExtensions).map(file => ({
        filename: file,
        type: 'video'
    }));

    let allMedia = [...imageFiles, ...videoFiles];

    // Embaralha o array para um feed mais dinâmico
    allMedia.sort(() => Math.random() - 0.5);

    // Adiciona dados fictícios após embaralhar para manter a variedade
    const finalMediaData = allMedia.map((media, index) => {
        // Gera de 2 a 4 tags aleatórias para cada item
        const numTags = Math.floor(Math.random() * 3) + 2;
        const mediaTags = new Set();
        while(mediaTags.size < numTags) {
            mediaTags.add(sampleTags[Math.floor(Math.random() * sampleTags.length)]);
        }

        return {
            id: `media_${index}_${Date.now()}`, // ID único e robusto
            ...media,
            description: `Descrição de exemplo para ${media.filename}`,
            tags: Array.from(mediaTags),
            date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        };
    });

    const jsonContent = JSON.stringify(finalMediaData, null, 2);
    fs.writeFileSync(outputJsonPath, jsonContent, 'utf8');

    console.log(`Sucesso! 'media.json' foi criado/atualizado com ${finalMediaData.length} itens de mídia.`);

} catch (error) {
    console.error("Ocorreu um erro ao gerar o arquivo JSON:", error.message);
    if (!fs.existsSync(outputJsonPath)) {
        fs.writeFileSync(outputJsonPath, '[]', 'utf8');
    }
}