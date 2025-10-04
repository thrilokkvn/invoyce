import { LucideIcon } from "lucide-react"

export default function ProfileField ({ label, value, icon: Icon, index } : {label: string, value: string, icon: LucideIcon, index: number}) {
  return (
    <div className="group relative py-3 px-4 rounded-lg transition-all duration-300 hover:bg-gray-50" style={{animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`}}>
        <div className="flex items-start gap-3">
            <div className="mt-1 transition-all duration-300 text-gray-400 group-hover:text-gray-900 group-hover:scale-110">
                <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</p>
                <p className="text-sm text-gray-900">{value}</p>
            </div>
        </div>
        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
    </div>
  )
};