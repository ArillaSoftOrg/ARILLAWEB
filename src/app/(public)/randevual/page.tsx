import type { Metadata } from 'next';
import RandevualClient from './RandevualClient';

export const metadata: Metadata = {
  title: 'Ön Görüşme Planla | Arilla Soft',
  description: 'İşletmeniz için uygun bir ön görüşme zamanı belirleyin.',
};

export default function RandevualPage() {
  return (
    <main
      style={{
        background: '#F4FAF7',
        minHeight: '100svh',
        paddingTop: '88px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '40px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1200px', padding: '0 16px' }}>
        <RandevualClient />
      </div>
    </main>
  );
}
