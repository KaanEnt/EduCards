export const geminiChat = async (message, file) => {
    const formData = new FormData();
    formData.append('message', message || '');
    if (file) {
        formData.append('file', file);
    }

    try {
        const response = await fetch('http://localhost:8000/api/chat/message/', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Server response:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in geminiChat:', error);
        throw error;
    }
}; 