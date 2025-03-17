import { useControls } from 'leva';

export const useLevaControls = () => {
    return useControls({
        background: {
            value: '#ffffff',
            label: 'Background Color'
        },
        cardColor: {
            value: '#1e3a8a',
            label: 'Card Color'
        },
        textColor: {
            value: '#ffffff',
            label: 'Text Color'
        },
        shadow: {
            value: '0 4px 8px rgba(0, 0, 0, 0.2)',
            label: 'Box Shadow'
        },
        borderRadius: {
            value: 15,
            min: 0,
            max: 50,
            label: 'Border Radius'
        }
    });
}; 