import { AnalyzerPanel } from '@/components/AnalyzerPanel';
import { PocketOptionPanel } from '@/components/PocketOptionPanel';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-pink-950">
      <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left Panel - Analyzer */}
        <div className="h-full border-r border-border/50">
          <AnalyzerPanel />
        </div>

        {/* Right Panel - Pocket Option */}
        <div className="h-full">
          <PocketOptionPanel />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;