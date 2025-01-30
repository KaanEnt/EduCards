export const geminiChat = async (message, file) => {
    const formData = new FormData();
    formData.append('message', message);
    if (file) {
        formData.append('file', file);
    }

    try {
        const response = await fetch('/api/chat/message/', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}; 