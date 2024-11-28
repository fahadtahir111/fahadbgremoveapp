const imageUpload = document.getElementById('imageUpload');
const removeBgBtn = document.getElementById('removeBgBtn');
const originalImage = document.getElementById('originalImage');
const resultImage = document.getElementById('resultImage');
const downloadBtn = document.getElementById('downloadBtn');

let uploadedImage = null;

imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            originalImage.src = reader.result;
            originalImage.style.display = 'block';
            uploadedImage = file;
        };
        reader.readAsDataURL(file);
    }
});

removeBgBtn.addEventListener('click', async () => {
    if (!uploadedImage) {
        alert('Please upload an image first!');
        return;
    }

    const formData = new FormData();
    formData.append('image_file', uploadedImage);
    formData.append('size', 'auto');

    try {
        // Replace 'YOUR_API_KEY' with your actual API key from remove.bg or similar.
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': '7Q6WPssgPcKcNskq8NwdYa6Q'
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to process the image');
        }

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        resultImage.src = objectUrl;
        resultImage.style.display = 'block';
        downloadBtn.style.display = 'block';

        downloadBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = 'background-removed.png';
            link.click();
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again later.');
    }
});
