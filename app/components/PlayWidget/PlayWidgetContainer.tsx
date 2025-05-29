import { useCurrentlyPlaying } from '~/hooks/useCurrentlyPlaying';
import { useProgressTimer } from '~/hooks/useProgressTimer';
import { PlayWidget } from './PlayWidget';

export function PlayWidgetContainer() {
    const { data, loading, error, refetch } = useCurrentlyPlaying();
    const progress = useProgressTimer(data);

    return (
        <PlayWidget
            data={data}
            progress={progress}
            loading={loading}
            error={error}
            onRetry={refetch}
        />
    );
} 