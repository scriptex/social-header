import download from 'downloadjs';
import html2canvas from 'html2canvas';

export const onDownload = async (node: HTMLElement | null) => {
    if (!node) {
        return;
    }

    const canvas = await html2canvas(node, {
        useCORS: true,
    });

    download(canvas.toDataURL(), 'social-header.png');
};
