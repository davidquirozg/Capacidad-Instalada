import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Search, 
  TrendingUp, 
  Lightbulb, 
  Settings, 
  UserCircle, 
  BarChart3, 
  Filter, 
  Download, 
  Calendar,
  ChevronDown,
  Bed,
  DoorOpen,
  TriangleAlert,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Maximize2,
  Clock,
  CheckCircle2,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { cn } from './lib/utils';

// --- Types ---
type ViewType = 'descriptivo' | 'diagnostico' | 'predictivo' | 'prescriptivo';

// --- Mock Data ---
const HISTORY_DATA = [
  { name: 'Ene', value: 60 },
  { name: 'Feb', value: 65 },
  { name: 'Mar', value: 72 },
  { name: 'Abr', value: 75 },
  { name: 'May', value: 82 },
  { name: 'Jun', value: 88 },
];

const PREDICTION_DATA = [
  { name: 'Mes 1', value: 10 },
  { name: 'Mes 2', value: 25 },
  { name: 'Mes 3', value: 45 },
  { name: 'Mes 4', value: 70 },
  { name: 'Mes 5', value: 95 },
  { name: 'Mes 6', value: 120 },
];

const SCATTER_DATA = [
  { x: 70, y: 135, name: 'Oftalmología', type: 'error' },
  { x: 60, y: 120, name: 'Traumatología', type: 'primary' },
  { x: 50, y: 110, name: 'Med. Interna', type: 'primary' },
  { x: 30, y: 95, name: 'Nutrición', type: 'secondary' },
  { x: 40, y: 60, name: 'Psicología', type: 'secondary' },
];

// --- Components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active: boolean, 
  onClick: () => void 
}) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group text-left",
      active 
        ? "bg-primary-container text-on-primary-container font-bold shadow-sm" 
        : "text-secondary hover:bg-surface-container-high"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "fill-current" : "group-hover:text-primary")} />
    <span className="text-sm font-semibold tracking-wide">{label}</span>
  </button>
);

const MetricCard = ({ 
  title, 
  value, 
  unit, 
  trend, 
  icon: Icon, 
  status,
  description 
}: { 
  title: string, 
  value: string | number, 
  unit?: string, 
  trend?: { val: string, up: boolean }, 
  icon?: any,
  status?: string,
  description?: string
}) => (
  <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-soft relative overflow-hidden flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <h4 className="text-xs font-bold text-secondary uppercase tracking-widest">{title}</h4>
      {Icon && (
        <div className="p-2 bg-primary-fixed rounded-lg text-primary">
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
    
    <div>
      <div className="flex items-baseline gap-2">
        <span className="display-metric text-on-surface">{value}</span>
        {unit && <span className="text-lg text-secondary font-medium">{unit}</span>}
      </div>
      
      {trend && (
        <div className={cn(
          "mt-3 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold",
          trend.up ? "bg-error-container text-on-error-container" : "bg-secondary-container text-on-secondary-container"
        )}>
          {trend.up ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
          {trend.val} vs mes anterior
        </div>
      )}
      
      {status && (
        <p className={cn("text-xs font-bold mt-2", status.includes('Crítico') ? 'text-error' : 'text-primary')}>
          {status}
        </p>
      )}
      
      {description && (
        <p className="text-xs text-secondary mt-2 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  </div>
);

// --- Main Views ---

const DescriptiveView = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <MetricCard 
        title="Ocupación General" 
        value="82%" 
        trend={{ val: "+5.2%", up: true }} 
        icon={Bed}
      />
      <MetricCard 
        title="Usos por Consultorio" 
        value="14.5" 
        unit="citas/día" 
        description="Estable según promedio histórico" 
        icon={DoorOpen}
      />
      <MetricCard 
        title="Brecha Capacidad" 
        value="-12%" 
        status="Déficit detectado en 4 regiones" 
        icon={TriangleAlert}
      />
      <div className="bg-primary-container/10 p-6 rounded-2xl border border-primary/20 flex flex-col justify-center gap-3">
        <h4 className="text-xs font-bold text-primary uppercase tracking-widest">Alerta Crítica</h4>
        <p className="text-sm text-on-surface leading-tight">CIS Centro Norte superó el 95% de ocupación en las últimas 24 horas.</p>
        <button className="text-xs font-bold text-primary underline underline-offset-4 text-left">Actuar ahora</button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-soft h-[450px] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-on-surface">Mapa de Red CIS - Estado de Saturación</h3>
          <div className="flex gap-4 text-[10px] font-bold uppercase tracking-tighter">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-error" /> Crítico</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" /> Moderado</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-tertiary" /> Óptimo</span>
          </div>
        </div>
        <div className="flex-1 bg-surface-container-low rounded-xl overflow-hidden relative border border-outline-variant/20">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtL06GM8UQId-7hLFUZSJYhQBcLoVaIlluELvL5J588Mk00T3vvRdsiyYvr3ltLZ4YFj1hPvLsP7DJ2XMtpA_YxXqyKGeww6VZKSLsGjU259jJRCPqtEKuITLE8zrcw4WyjThqzmhLOrvwUmtTDlGXzzWLIAuq3Xl2Ud8hZoAbzfRoKdhODSYOVRQ7qmI38_zy4mmv_0dq__hrNvGCf5ghyMLmCc_cG7uuAwRPUvxHM_Ldev3UOQk1Km-8KbjFFgMHeTe9OGLE3kNU" 
            className="w-full h-full object-cover opacity-90 brightness-110"
            alt="City Health Map"
          />
          <div className="absolute bottom-4 right-4 flex flex-col gap-1">
            <button className="p-2 bg-surface rounded-lg shadow-sm hover:scale-105 transition-transform"><Plus className="w-4 h-4 text-secondary" /></button>
            <button className="p-2 bg-surface rounded-lg shadow-sm hover:scale-105 transition-transform"><Minus className="w-4 h-4 text-secondary" /></button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-soft flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-on-surface">Tendencia de Uso Histórico</h3>
          <MoreHorizontal className="w-4 h-4 text-secondary" />
        </div>
        <div className="flex-1 w-full min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={HISTORY_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3BDC3" opacity={0.3} />
              <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#4C616C'}} />
              <YAxis fontSize={10} axisLine={false} tickLine={false} unit="%" tick={{fill: '#4C616C'}} />
              <Tooltip cursor={{fill: '#FFF0F1'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {HISTORY_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.value > 80 ? '#B0004A' : entry.value > 70 ? '#D81B60' : '#FFD9DE'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);

const DiagnosticView = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <MetricCard title="Índice de Presión" value="118%" status="Crítico: Sobre capacidad" trend={{val: "+5%", up: true}} />
      <MetricCard title="Desviación Agenda" value="+18" unit="min" description="Retraso promedio por paciente" icon={Clock} />
      <MetricCard title="Tasa Ausentismo" value="8.4%" trend={{val: "-1.2%", up: false}} icon={TriangleAlert} />
      <MetricCard title="Eficiencia Box" value="92%" description="Tiempo real vs planificado" icon={CheckCircle2} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-soft h-[450px] flex flex-col">
        <h3 className="text-sm font-bold text-on-surface mb-6">Cuellos de botella por franja horaria</h3>
        <div className="flex-1 grid grid-cols-6 grid-rows-5 gap-1 text-[10px] uppercase font-bold text-secondary text-center">
          <div /><div>Lun</div><div>Mar</div><div>Mie</div><div>Jue</div><div>Vie</div>
          <div className="flex items-center justify-end pr-2">08:00</div>
          <div className="bg-surface-variant rounded-sm"></div><div className="bg-primary-fixed rounded-sm"></div><div className="bg-primary-fixed rounded-sm"></div><div className="bg-surface-variant rounded-sm"></div><div className="bg-primary-fixed rounded-sm"></div>
          
          <div className="flex items-center justify-end pr-2">10:00</div>
          <div className="bg-primary opacity-60 rounded-sm"></div><div className="bg-primary rounded-sm"></div><div className="bg-on-primary-fixed-variant rounded-sm"></div><div className="bg-primary rounded-sm"></div><div className="bg-primary opacity-60 rounded-sm"></div>
          
          <div className="flex items-center justify-end pr-2">12:00</div>
          <div className="bg-on-primary-fixed-variant rounded-sm"></div><div className="bg-on-primary-fixed-variant rounded-sm"></div><div className="bg-primary rounded-sm"></div><div className="bg-on-primary-fixed-variant rounded-sm"></div><div className="bg-primary opacity-60 rounded-sm"></div>
          
          <div className="flex items-center justify-end pr-2">14:00</div>
          <div className="bg-surface-variant rounded-sm"></div><div className="bg-surface-variant rounded-sm"></div><div className="bg-surface-variant rounded-sm"></div><div className="bg-surface-variant rounded-sm"></div><div className="bg-surface-variant rounded-sm"></div>
        </div>
        <div className="mt-4 flex justify-end items-center gap-2 text-[10px] text-secondary font-bold">
           <span>BAJA</span>
           <div className="flex gap-1">
            <div className="w-3 h-3 bg-surface-variant rounded-sm"></div>
            <div className="w-3 h-3 bg-primary-fixed rounded-sm"></div>
            <div className="w-3 h-3 bg-primary rounded-sm"></div>
            <div className="w-3 h-3 bg-on-primary-fixed-variant rounded-sm"></div>
           </div>
           <span>ALTA</span>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-soft h-[450px] flex flex-col">
        <h3 className="text-sm font-bold text-on-surface mb-6">Capacidad vs Uso</h3>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis type="number" dataKey="x" name="Capacidad" fontSize={10} axisLine={false} tickLine={false} unit="h" />
              <YAxis type="number" dataKey="y" name="Uso" fontSize={10} axisLine={false} tickLine={false} unit="h" />
              <ZAxis type="number" range={[100, 400]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Servicios" data={SCATTER_DATA}>
                {SCATTER_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.type === 'error' ? '#BA1A1A' : entry.type === 'primary' ? '#B0004A' : '#4C616C'} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[10px] text-center text-secondary font-medium">Correlación entre horas instaladas y demanda real</p>
      </div>
    </div>
  </div>
);

const PredictiveView = () => (
  <div className="space-y-6">
    <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-soft border-l-8 border-primary flex items-center justify-between">
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-secondary uppercase tracking-[0.2em]">Riesgo Proyectado Global (M6)</h3>
        <div className="flex items-baseline gap-4">
          <span className="display-metric text-on-surface">84.2%</span>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-error-container text-on-error-container rounded-full text-sm font-bold">
            <TrendingUp className="w-4 h-4" />
            +5.4%
          </div>
        </div>
        <p className="text-sm text-secondary max-w-lg leading-relaxed">Presión de capacidad proyectada en la red CIS para los próximos 6 meses. Se recomienda expansión en regiones Norte y Centro.</p>
      </div>
      <div className="hidden lg:block w-48 h-48 bg-primary/5 rounded-full border border-primary/10 flex items-center justify-center">
        <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
           <BarChart3 className="w-12 h-12 text-primary" />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-soft flex flex-col h-[400px]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-on-surface">Crecimiento Poblacional Proyectado</h3>
          <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full">+12,450 ptes</span>
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={PREDICTION_DATA}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B0004A" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#B0004A" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3BDC3" opacity={0.3} />
              <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#4C616C'}} />
              <YAxis fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#4C616C'}} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#B0004A" strokeWidth={3} dot={{r: 4, fill: '#B0004A'}} activeDot={{r: 8}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-soft">
        <h3 className="text-sm font-bold text-on-surface mb-6">Ranking de Riesgo (Centros CIS)</h3>
        <div className="space-y-4">
          {[
            { name: 'CIS Norte', val: '92%', level: 'error' },
            { name: 'CIS Centro', val: '88%', level: 'primary' },
            { name: 'CIS Sur', val: '75%', level: 'secondary' },
            { name: 'CIS Este', val: '60%', level: 'secondary' }
          ].map((item) => (
            <div key={item.name} className="flex items-center justify-between p-3 hover:bg-surface-container transition-colors rounded-xl border border-outline-variant/10">
              <span className="text-sm font-medium text-secondary">{item.name}</span>
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-bold",
                item.level === 'error' ? "bg-error-container text-on-error-container" :
                item.level === 'primary' ? "bg-primary-container text-white" :
                "bg-surface-container-high text-on-surface"
              )}>
                {item.val}
              </span>
            </div>
          ))}
        </div>
        <button className="w-full mt-6 py-2.5 rounded-xl border border-primary text-primary text-xs font-bold hover:bg-primary/5 transition-colors">
          Ver Detalle Completo
        </button>
      </div>
    </div>
  </div>
);

const PrescriptivoView = () => {
  const [val1, setVal1] = useState(60);
  const [val2, setVal2] = useState(35);
  const [val3, setVal3] = useState(80);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-outline-variant/30">
            <div className="flex items-center gap-2 mb-8 border-b border-outline-variant/20 pb-4">
              <Filter className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-on-surface">Variables de Simulación</h3>
            </div>
            
            <div className="space-y-12 mb-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-secondary uppercase">Cambio de Horario (Personal)</span>
                  <span className="text-primary">+2 Horas</span>
                </div>
                <input type="range" value={val1} onChange={(e) => setVal1(parseInt(e.target.value))} className="w-full h-2 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-primary" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-secondary uppercase">Redistribución de Servicios</span>
                  <span className="text-primary">15% a Pediatría</span>
                </div>
                <input type="range" value={val2} onChange={(e) => setVal2(parseInt(e.target.value))} className="w-full h-2 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-primary" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-secondary uppercase">Habilitación de Consultorios</span>
                  <span className="text-primary">+3 Consultorios</span>
                </div>
                <input type="range" value={val3} onChange={(e) => setVal3(parseInt(e.target.value))} className="w-full h-2 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-primary" />
              </div>
            </div>

            <div className="flex justify-end gap-4 border-t border-outline-variant/20 pt-6">
              <button className="px-6 py-2 rounded-xl border border-outline text-secondary text-xs font-bold hover:bg-surface-container-low transition-colors">
                Restablecer
              </button>
              <button className="px-6 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm hover:brightness-110 active:scale-95 transition-all">
                Ejecutar Simulación
              </button>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-outline-variant/30">
            <div className="flex items-center gap-2 mb-4 border-b border-outline-variant/20 pb-4">
              <Lightbulb className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-on-surface">Sugerencias del Modelo</h3>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Extender Pediatría', icon: DoorOpen, desc: 'Sugerimos asignar 2 médicos adicionales al turno tarde para reducir espera en 25%.' },
                { title: 'Optimizar Triaje', icon: Clock, desc: 'Desplazar horarios de almuerzo 30 min mitigaría pico de las 13:00 hrs.' }
              ].map((item) => (
                <div key={item.title} className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/20 flex gap-4 items-start">
                  <item.icon className="w-5 h-5 text-secondary mt-1" />
                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm font-bold text-on-surface">{item.title}</h4>
                    <p className="text-xs text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                  <button className="px-3 py-1.5 bg-primary text-white text-[10px] font-bold rounded-lg hover:opacity-90">Aplicar</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-outline-variant/30 flex flex-col items-center justify-center gap-8">
           <h3 className="text-sm font-bold text-on-surface self-start w-full border-b border-outline-variant/20 pb-4">Estado Actual vs Simulado</h3>
           
           <div className="flex items-end gap-12 w-full max-w-sm h-64 border-b border-outline-variant/40 pb-2 px-12">
              <div className="flex-1 flex flex-col items-center gap-2 justify-end h-full">
                <span className="text-xs font-bold text-secondary">85%</span>
                <div className="w-full bg-secondary/20 rounded-t-lg h-[85%]" />
                <span className="text-[10px] font-bold uppercase text-secondary">Actual</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-2 justify-end h-full">
                <span className="text-xs font-bold text-primary">68%</span>
                <div className="w-full bg-primary rounded-t-lg h-[68%]" />
                <span className="text-[10px] font-bold uppercase text-on-surface">Simulado</span>
              </div>
           </div>

           <div className="px-6 py-2 bg-tertiary-container text-on-tertiary-container rounded-full text-xs font-bold flex items-center gap-2">
             <ArrowDownRight className="w-4 h-4" />
             -17% Mejora proyectada
           </div>

           <div className="w-full space-y-4 pt-12">
              <div className="flex justify-between items-center">
                 <span className="text-xs font-medium text-secondary">Nivel de Saturación</span>
                 <span className="text-xs font-bold text-primary">Bajo</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[30%]" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- App Layout ---

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('descriptivo');
  const [timeRange, setTimeRange] = useState('Mes');
  const [selectedCIS, setSelectedCIS] = useState('Todos los Centros');
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isCISOpen, setIsCISOpen] = useState(false);
  
  const timeRanges = ['Día', 'Mes', 'Trimestre', 'Semestre', 'Año'];
  const cisCentros = ['Todos los Centros', 'CIS Centro Norte', 'CIS Valle Sur', 'CIS Este Metropolitano', 'CIS Occidente'];

  const renderHeader = () => (
    <header className="bg-surface shadow-[0_4px_16px_0_rgba(69,90,100,0.08)] sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-container text-white rounded-lg">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-primary">Gestión de Capacidad</h2>
        </div>
        
        <div className="flex items-center gap-3">
          {/* CIS Filter */}
          <div className="relative">
            <button 
              onClick={() => { setIsCISOpen(!isCISOpen); setIsTimeOpen(false); }}
              className="flex items-center gap-2 px-4 py-2 bg-surface-container border border-outline-variant rounded-xl text-secondary text-xs md:text-sm font-bold hover:bg-surface-container-highest transition-colors min-w-[140px]"
            >
              <div className="truncate max-w-[120px]">{selectedCIS}</div>
              <ChevronDown className={cn("w-4 h-4 transition-transform", isCISOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {isCISOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-56 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl overflow-hidden"
                >
                  {cisCentros.map(cis => (
                    <button 
                      key={cis}
                      onClick={() => { setSelectedCIS(cis); setIsCISOpen(false); }}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-surface-container transition-colors",
                        selectedCIS === cis ? "bg-primary-container/10 text-primary" : "text-secondary"
                      )}
                    >
                      {cis}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Time Range Filter */}
          <div className="relative">
            <button 
              onClick={() => { setIsTimeOpen(!isTimeOpen); setIsCISOpen(false); }}
              className="flex items-center gap-2 px-4 py-2 bg-surface-container border border-outline-variant rounded-xl text-secondary text-xs md:text-sm font-bold hover:bg-surface-container-highest transition-colors"
            >
              Temporalidad: {timeRange}
              <Calendar className="w-4 h-4" />
              <ChevronDown className={cn("w-3 h-3 transition-transform", isTimeOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {isTimeOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl overflow-hidden"
                >
                  {timeRanges.map(range => (
                    <button 
                      key={range}
                      onClick={() => { setTimeRange(range); setIsTimeOpen(false); }}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-surface-container transition-colors",
                        timeRange === range ? "bg-primary-container/10 text-primary" : "text-secondary"
                      )}
                    >
                      Por {range}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button className="hidden md:flex p-2 text-secondary hover:bg-surface-container-highest rounded-full transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-80 fixed left-0 top-0 h-screen bg-surface-container-lowest border-r border-outline-variant/30 flex-col p-8 gap-8 z-40 shadow-xl overflow-y-auto">
        <div className="px-4">
          <h1 className="text-2xl font-bold text-primary">Análisis Ejecutivo</h1>
        </div>
        
        <nav className="flex-1 flex flex-col gap-2">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Descriptivo" 
            active={currentView === 'descriptivo'} 
            onClick={() => setCurrentView('descriptivo')} 
          />
          <SidebarItem 
            icon={Search} 
            label="Diagnóstico" 
            active={currentView === 'diagnostico'} 
            onClick={() => setCurrentView('diagnostico')} 
          />
          <SidebarItem 
            icon={TrendingUp} 
            label="Predictivo" 
            active={currentView === 'predictivo'} 
            onClick={() => setCurrentView('predictivo')} 
          />
          <SidebarItem 
            icon={Lightbulb} 
            label="Prescriptivo" 
            active={currentView === 'prescriptivo'} 
            onClick={() => setCurrentView('prescriptivo')} 
          />
        </nav>

        <div className="pt-8 border-t border-outline-variant/20 flex flex-col gap-2">
          <button className="flex items-center gap-4 px-4 py-3 text-secondary hover:text-primary transition-colors text-sm font-semibold">
            <Settings className="w-5 h-5" />
            Configuración
          </button>
          <button className="flex items-center gap-4 px-4 py-3 text-secondary hover:text-primary transition-colors text-sm font-semibold">
            <UserCircle className="w-5 h-5" />
            Perfil
          </button>
        </div>
      </aside>

      {/* Sidebar - Mobile Nav */}
      <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-sm bg-surface-container-highest rounded-3xl shadow-2xl p-2 flex items-center justify-around z-50 border border-outline-variant/50">
        {[
          { id: 'descriptivo', icon: LayoutDashboard },
          { id: 'diagnostico', icon: Search },
          { id: 'predictivo', icon: TrendingUp },
          { id: 'prescriptivo', icon: Lightbulb }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id as ViewType)}
            className={cn(
              "p-4 rounded-2xl transition-all duration-300",
              currentView === item.id ? "bg-primary text-white shadow-lg -translate-y-2 scale-110" : "text-secondary hover:bg-surface-container"
            )}
          >
            <item.icon className="w-6 h-6" />
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 lg:ml-80 flex flex-col">
        {renderHeader()}
        
        <div className="max-w-[1440px] mx-auto w-full p-8 pb-32 lg:pb-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-on-surface capitalize">Dashboard {currentView}</h2>
            <p className="text-secondary mt-1 font-medium">Gestión estratégica de la red clínica CIS.</p>
          </div>

          <div className="flex flex-col gap-4 mb-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-2">
               <button className="px-4 py-2 bg-surface-container-low border border-outline-variant text-[10px] font-bold uppercase tracking-widest text-secondary rounded-lg">Filtro Rápido</button>
               <button className="px-4 py-2 bg-surface-container-low border border-outline-variant text-[10px] font-bold uppercase tracking-widest text-secondary rounded-lg">Avanzado</button>
            </div>
            <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-sm hover:scale-[1.02] transition-all">
              <Download className="w-4 h-4" />
              Exportar Reporte
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {currentView === 'descriptivo' && <DescriptiveView />}
              {currentView === 'diagnostico' && <DiagnosticView />}
              {currentView === 'predictivo' && <PredictiveView />}
              {currentView === 'prescriptivo' && <PrescriptivoView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
