import { motion, AnimatePresence, type Variants } from 'motion/react'
import { 
  Download, MonitorPlay, Shield, Image as ImageIcon, Volume2, 
  Settings2, FolderDown, FileVideo, HardDrive, Cpu, ChevronDown, ChevronRight, X, Mail, CheckCircle2
} from 'lucide-react'
import { useState, useEffect } from 'react'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-border">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
      >
        <h3 className="font-heading font-bold text-lg md:text-xl">{question}</h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted-foreground text-lg leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Reusable Modal Component
function Modal({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[101] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card border border-border w-full max-w-2xl rounded-lg shadow-2xl pointer-events-auto flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="font-heading font-bold text-2xl text-foreground">{title}</h2>
                <button onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                {children}
              </div>
              <div className="p-6 border-t border-border flex justify-end bg-background/50 rounded-b-lg">
                <button onClick={onClose} className="px-6 py-2 bg-primary text-primary-foreground font-heading font-bold rounded hover:bg-primary/90 transition-colors">
                  CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

type ModalType = 'releaseNotes' | 'privacy' | 'terms' | 'license' | null;

function App() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [recommendation, setRecommendation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async () => {
    if (!recommendation.trim()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      // Replace YOUR_FORMSPREE_ID with the actual ID from formspree.io
      const response = await fetch("https://formspree.io/f/xgaezgdb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          message: recommendation,
        }),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setRecommendation("");
        // Reset success message after 3 seconds
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen selection:bg-primary/30 overflow-x-hidden relative">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
            <span className="font-heading font-bold text-xl tracking-wider">MEDIAFORGE</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#features" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors tracking-widest">ARSENAL</a>
            <a href="#workflow" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors tracking-widest">WORKFLOW</a>
            <a href="#specs" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors tracking-widest">SPECS</a>
            <a href="/MediaForge-v1.5.exe" download="MediaForge-v1.5.exe" className="px-5 py-2.5 bg-primary text-primary-foreground font-heading font-bold rounded hover:bg-primary/90 transition-colors">
              GET IT NOW
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative pt-32 pb-32">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-3xl">
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-bold mb-8 cursor-pointer hover:bg-primary/10 transition-colors" onClick={() => setActiveModal('releaseNotes')}>
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                v1.5 PORTABLE RELEASE NOW AVAILABLE — READ NOTES
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="font-heading font-bold text-6xl md:text-8xl mb-6 leading-[1.05] text-foreground tracking-tight">
                PURE. OFFLINE. <br/>
                <span className="text-primary">UNCOMPROMISED.</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-muted-foreground text-xl md:text-2xl mb-12 max-w-xl text-balance leading-relaxed">
                No cloud uploads. No monthly fees. No internet required. 
                The ultimate desktop engine for media conversion, upscaling, and frame extraction, packed into a single portable executable.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <a href="/MediaForge-v1.5.exe" download="MediaForge-v1.5.exe" className="group relative px-8 py-4 bg-primary text-primary-foreground font-heading font-bold text-lg rounded transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] flex items-center justify-center gap-3 overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <Download className="w-5 h-5" />
                  DOWNLOAD (130MB .EXE)
                </a>
                <a href="#features" className="px-8 py-4 bg-transparent border border-border text-foreground font-heading font-bold text-lg rounded hover:bg-card-elevated transition-colors flex items-center justify-center gap-2 group">
                  EXPLORE ARSENAL
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </motion.div>

            {/* Right side animated logo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="hidden lg:flex justify-end items-center relative lg:translate-x-32"
            >
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full w-3/4 h-3/4 m-auto -z-10" />
              <motion.img 
                src="/favicon.ico" 
                alt="MediaForge Logo" 
                className="w-96 h-96 object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.5)]"
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>

        <div className="absolute -bottom-px left-0 right-0 h-[1px] bg-border overflow-hidden">
          <motion.div
            className="h-full w-1/4 bg-primary rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"
            animate={{ x: ["-100%", "400%"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          />
        </div>
      </section>

      {/* The Arsenal (Features Grid) */}
      <section id="features" className="py-32 bg-card relative scroll-m-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="mb-16">
            <motion.h2 variants={fadeInUp} className="font-heading font-bold text-5xl mb-4">THE ARSENAL</motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-xl">Industrial-grade tools wrapped in Obsidian Glass.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <FolderDown className="w-8 h-8" />,
                title: "BATCH PROCESSING",
                desc: "Drag & drop entire folders. MediaForge recursively discovers and queues your files for massive batch jobs."
              },
              {
                icon: <MonitorPlay className="w-8 h-8" />,
                title: "LANCZOS UPSCALING",
                desc: "Premium algorithmic sharpening and scaling. Elevate 720p and 1080p footage to crisp 4K without bloated AI models."
              },
              {
                icon: <ImageIcon className="w-8 h-8" />,
                title: "FRAME EXTRACTION",
                desc: "Slice video into perfectly organized image sequences (.png/.jpg) at custom framerates from 60fps down to 0.2fps."
              },
              {
                icon: <Volume2 className="w-8 h-8" />,
                title: "AUDIO STRIPPING",
                desc: "Extract pristine .wav, .flac, .mp3, or .aac audio tracks from video files with zero quality loss."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "ABSOLUTE PRIVACY",
                desc: "Every operation happens locally on your hardware. No telemetry, no accounts, zero data leaves your machine."
              },
              {
                icon: <Settings2 className="w-8 h-8" />,
                title: "PORTABLE POWER",
                desc: "A single, monolithic 130MB executable. FFmpeg is built right in. Drop it on a USB drive and run it anywhere."
              }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ y: -5 }} className="bg-background border border-border p-8 rounded hover:border-primary/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all group">
                <div className="text-muted-foreground group-hover:text-primary transition-colors mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Workflow (How it Works) */}
      <section id="workflow" className="py-32 border-t border-border bg-background scroll-m-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="mb-20 text-center">
            <motion.h2 variants={fadeInUp} className="font-heading font-bold text-5xl mb-4">STREAMLINED WORKFLOW</motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-xl max-w-2xl mx-auto">From raw files to finished assets in seconds.</motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-border -z-10" />
            
            {[
              { step: "01", title: "DRAG & DROP", desc: "Drop a single file or a deeply nested folder. MediaForge automatically indexes every compatible media file instantly." },
              { step: "02", title: "DIAL IN SETTINGS", desc: "Select your target codec, resolution, and audio quality. Use presets or dive deep into custom bitrates." },
              { step: "03", title: "FORGE", desc: "Hit start and watch the multi-threaded queue go to work with accurate ETAs and smart folder organization." }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2, duration: 0.6 }} className="text-center relative bg-background">
                <div className="w-24 h-24 mx-auto bg-card border border-border rounded-full flex items-center justify-center font-heading font-bold text-3xl text-primary mb-8 relative shadow-xl shadow-background">
                  {item.step}
                  <div className="absolute inset-[-4px] border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section id="specs" className="py-32 border-t border-border bg-card scroll-m-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
              <motion.h2 variants={fadeInUp} className="font-heading font-bold text-5xl mb-6">TECHNICAL SPECS</motion.h2>
              <motion.p variants={fadeInUp} className="text-muted-foreground text-lg mb-8 leading-relaxed">
                MediaForge is built on top of a heavily optimized, statically compiled FFmpeg binary. It supports nearly every format imaginable, giving you studio-grade encoding tools wrapped in an accessible UI.
              </motion.p>
              
              <div className="space-y-6">
                {[
                  { icon: <FileVideo className="text-primary w-6 h-6" />, title: "Supported Video Formats", content: "MP4, MKV, AVI, MOV, WEBM, FLV, WMV" },
                  { icon: <Volume2 className="text-primary w-6 h-6" />, title: "Supported Audio Formats", content: "MP3, WAV, FLAC, AAC, M4A, OGG" },
                  { icon: <ImageIcon className="text-primary w-6 h-6" />, title: "Image Sequence Extraction", content: "PNG, JPG (60fps to 0.2fps)" },
                  { icon: <Cpu className="text-primary w-6 h-6" />, title: "Scaling Algorithms", content: "Lanczos, Bicubic, Bilinear with Unsharp Masking" }
                ].map((spec, i) => (
                  <motion.div variants={fadeInUp} key={i} className="flex gap-4 p-4 bg-background border border-border rounded">
                    {spec.icon}
                    <div>
                      <h4 className="font-heading font-bold text-foreground mb-1">{spec.title}</h4>
                      <p className="text-muted-foreground text-sm font-mono">{spec.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="bg-card-elevated border border-border rounded-lg p-6 relative overflow-hidden h-full flex flex-col">
              <div className="absolute -top-10 -right-10 p-4 opacity-5 rotate-12">
                <HardDrive className="w-64 h-64 text-foreground" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-6 flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-primary" />
                Under The Hood
              </h3>
              <div className="flex-1 bg-background rounded border border-border p-4 relative z-10 font-mono text-xs text-muted-foreground overflow-x-auto leading-loose">
<pre><code>{`# converter.py | core upscaling pipeline

def build_ffmpeg_command(self):
    cmd = [self.ffmpeg_path, "-i", self.input_path]
    filters = []
    
    # Premium upscaling applied via Lanczos
    if self.resolution == '4k':
        filters.append(
            "scale=-1:2160:flags=lanczos,"
            "unsharp=5:5:1.0:5:5:0.0"
        )
    elif self.resolution == '1080p':
        filters.append(
            "scale=-1:1080:flags=lanczos,"
            "unsharp=5:5:1.0:5:5:0.0"
        )

    # Frame extraction routing
    if self.mode == "image":
        cmd.extend(["-an"]) # Strip audio
        cmd.extend(["-r", str(self.fps)])
        
    if filters:
        cmd.extend(["-vf", ",".join(filters)])
        
    return cmd`}</code></pre>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 border-t border-border bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="mb-16 text-center">
            <motion.h2 variants={fadeInUp} className="font-heading font-bold text-5xl mb-4">FREQUENTLY ASKED QUESTIONS</motion.h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="border-t border-border">
            {[
              { q: "Does MediaForge require an internet connection?", a: "No. MediaForge is 100% offline. All conversions, extractions, and upscaling processes happen directly on your local hardware. No data is ever sent to a server, ensuring absolute privacy." },
              { q: "How does the upscaling work without AI?", a: "MediaForge utilizes FFmpeg's high-quality Lanczos scaling algorithm combined with an unsharp mask filter. This provides incredibly sharp and detailed upscaling (e.g., 1080p to 4K) without the massive file size, hardware requirements, or processing times associated with AI models." },
              { q: "Do I need to install FFmpeg separately?", a: "No. The 130MB Windows executable comes bundled with a statically compiled version of FFmpeg. You simply download the .exe, double-click it, and start converting immediately—no installation required." },
              { q: "What platforms are supported?", a: "Currently, MediaForge v1.5 is compiled exclusively for Windows as a portable .exe. Mac and Linux versions can be built from source using our provided build scripts." }
            ].map((faq, i) => (
              <FaqItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recommendations CTA */}
      <section className="py-24 border-t border-border bg-card-elevated relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="font-heading font-bold text-4xl md:text-5xl mb-6 text-foreground">
              GOT ANY RECOMMENDATIONS?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              We're constantly forging new tools. If you have an idea for a feature, a new preset, or just want to tell us about it, drop it below!
            </motion.p>
            
            <motion.div variants={fadeInUp} className="max-w-xl mx-auto">
              <textarea 
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                placeholder="I would love to see a feature that..."
                className="w-full h-32 p-4 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none mb-4 shadow-inner"
              />
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting || !recommendation.trim()}
                className="inline-flex items-center justify-center w-full gap-3 px-8 py-4 bg-primary text-primary-foreground font-heading font-bold text-lg rounded hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">SENDING...</span>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    SENT SUCCESSFULLY!
                  </>
                ) : submitStatus === 'error' ? (
                  <>
                    <X className="w-5 h-5" />
                    ERROR SENDING (CHECK ID)
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    SEND RECOMMENDATION
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/favicon.ico" alt="Logo" className="w-6 h-6" />
                <span className="font-heading font-bold text-xl tracking-wider">MEDIAFORGE</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                The offline media swiss-army knife for creators, editors, and archivists who demand speed, privacy, and control.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-4 text-foreground uppercase">PRODUCT</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors text-sm">Arsenal</a></li>
                <li><a href="#workflow" className="text-muted-foreground hover:text-primary transition-colors text-sm">Workflow</a></li>
                <li><a href="#specs" className="text-muted-foreground hover:text-primary transition-colors text-sm">Technical Specs</a></li>
                <li><button onClick={() => setActiveModal('releaseNotes')} className="text-muted-foreground hover:text-primary transition-colors text-sm cursor-pointer">Release Notes</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-4 text-foreground uppercase">LEGAL</h4>
              <ul className="space-y-3">
                <li><button onClick={() => setActiveModal('privacy')} className="text-muted-foreground hover:text-primary transition-colors text-sm cursor-pointer">Privacy Policy</button></li>
                <li><button onClick={() => setActiveModal('terms')} className="text-muted-foreground hover:text-primary transition-colors text-sm cursor-pointer">Terms of Service</button></li>
                <li><button onClick={() => setActiveModal('license')} className="text-muted-foreground hover:text-primary transition-colors text-sm cursor-pointer">License</button></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} MediaForge. Built for creators.
            </p>
            <div className="text-muted-foreground text-sm flex items-center gap-2">
              Powered by <span className="text-foreground font-bold">FFmpeg</span> & <span className="text-foreground font-bold">Python</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal isOpen={activeModal === 'releaseNotes'} onClose={() => setActiveModal(null)} title="Release Notes (v1.5)">
        <div className="space-y-6 text-muted-foreground">
          <div>
            <h4 className="font-heading font-bold text-foreground text-lg mb-2">v1.5.0 (Latest)</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Added recursive folder drag-and-drop for deep batch processing.</li>
              <li>Integrated native Windows Toast Notifications upon task completion.</li>
              <li>New Smart ETA calculations based on real-time hardware speed.</li>
              <li>Added 5 interactive Wave Themes for the Liquid Glass UI.</li>
              <li>New feature: Frame Extraction for converting video to .png/.jpg sequences.</li>
            </ul>
          </div>
          <div className="pt-4 border-t border-border">
            <h4 className="font-heading font-bold text-foreground text-lg mb-2">v1.0.0</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Initial public release of MediaForge portable.</li>
              <li>Bundled FFmpeg statically to ensure a zero-dependency 130MB binary.</li>
              <li>Lanczos 1080p and 4K upscaling pipelines implemented.</li>
              <li>Audio extraction (WAV, FLAC, MP3, AAC) pipeline added.</li>
            </ul>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'privacy'} onClose={() => setActiveModal(null)} title="Privacy Policy">
        <div className="space-y-4 text-muted-foreground">
          <p>Effective Date: September 2026</p>
          <p>
            MediaForge operates <strong>entirely offline</strong> on your local machine. We collect exactly zero telemetry, zero analytics, and zero usage data.
          </p>
          <p>
            Your media files never leave your hardware. There is no cloud, no server connection, and no tracking script running in the background. Your files remain exclusively under your control.
          </p>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'terms'} onClose={() => setActiveModal(null)} title="Terms of Service">
        <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
          <p>
            By downloading, installing, or using MediaForge, you explicitly agree to the following terms:
          </p>
          <div className="space-y-3">
            <div>
              <strong className="text-foreground">1. No Warranty ("As-Is" Basis)</strong>
              <p>MediaForge is provided "as is" and "as available", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall the developers be liable for any claim, damages, data loss, hardware degradation, or other liability arising from your use of the software.</p>
            </div>
            <div>
              <strong className="text-foreground">2. Copyright & Lawful Use</strong>
              <p>MediaForge is a strictly neutral processing tool. You are solely and entirely responsible for the media you process. You agree NOT to use this software to bypass DRM, infringe upon copyrights, pirate intellectual property, or process material for which you do not hold the explicit legal rights. The developers of MediaForge do not condone, support, or take any responsibility for copyright infringement committed by users.</p>
            </div>
            <div>
              <strong className="text-foreground">3. Indemnification</strong>
              <p>You agree to indemnify, defend, and hold harmless the developers of MediaForge from any claims, damages, liabilities, and expenses (including legal fees) arising out of your misuse of the software or your violation of any third-party rights, including copyright.</p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'license'} onClose={() => setActiveModal(null)} title="License Information">
        <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
          <div>
            <strong className="text-foreground">MediaForge UI & Core Logic</strong>
            <p>Copyright © {new Date().getFullYear()} MediaForge</p>
            <p>The Python core and React interface are licensed under the MIT License. You are free to modify, distribute, and use this software for both commercial and non-commercial purposes, provided the original copyright notice is included.</p>
          </div>
          <div className="pt-4 border-t border-border">
            <strong className="text-foreground">Third-Party Software: FFmpeg</strong>
            <p>MediaForge relies on FFmpeg for underlying multimedia processing. FFmpeg is distributed as a standalone, unmodified executable alongside this application and is invoked strictly via the command-line interface, constituting an "aggregate" work.</p>
            <p className="mt-2">FFmpeg is free software licensed under the GNU Lesser General Public License (LGPL) version 2.1 or later. Some specific builds may be subject to the GNU General Public License (GPL) depending on compilation flags. The source code for FFmpeg can be obtained from <a href="https://ffmpeg.org" target="_blank" rel="noreferrer" className="text-primary hover:underline">ffmpeg.org</a>.</p>
            <p className="mt-2 text-xs">MediaForge is not affiliated with, endorsed by, or sponsored by the FFmpeg project. The FFmpeg trademark is the property of Fabrice Bellard.</p>
          </div>
        </div>
      </Modal>

    </div>
  )
}

export default App
