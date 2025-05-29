import { Box, Image } from '@mantine/core';
import { IconMusic } from '@tabler/icons-react';

interface AlbumArtworkProps {
    src?: string;
    alt?: string;
    size?: number;
}

export function AlbumArtwork({ src, alt = 'Album artwork', size = 80 }: AlbumArtworkProps) {
    return (
        <Box
            style={{
                width: size,
                height: size,
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: 'var(--mantine-color-gray-1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {src ? (
                <Image
                    src={src}
                    alt={alt}
                    w={size}
                    h={size}
                    fit="cover"
                    data-testid="album-artwork"
                />
            ) : (
                <IconMusic
                    size={size * 0.4}
                    color="var(--mantine-color-gray-6)"
                    data-testid="fallback-artwork"
                />
            )}
        </Box>
    );
} 