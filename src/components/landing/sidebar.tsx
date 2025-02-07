import { Safari } from "./ui/safari"
import { ChevronDown, Star, FileText } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MainContent } from "./main-content"

interface ActivityItem {
  title: string
  company: string
  location: string
  technologies: string[]
  additionalCount: number
}

const activities: ActivityItem[] = [
  {
    title: "Senior React Developer At",
    company: "G3deon, Inc",
    location: "US, San Francisco, w 41 Street",
    technologies: ["React", "JavaScript"],
    additionalCount: 7,
  },
  {
    title: "Senior React Developer At",
    company: "G3deon, Inc",
    location: "US, San Francisco, w 41 Street",
    technologies: ["React", "JavaScript"],
    additionalCount: 7,
  },
  {
    title: "Senior React Developer At",
    company: "G3deon, Inc",
    location: "US, San Francisco, w 41 Street",
    technologies: ["React", "JavaScript"],
    additionalCount: 7,
  },
]

export function SidebarLayout() {
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="w-full aspect-[1203/753]">
        <Safari url="talentix.com" width={1203} height={753} className="w-full h-full">
          <div className="flex h-[700px]">
            {/* Sidebar */}
            <div className="w-72 bg-zinc-950 border-r border-zinc-800/50">
              <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="p-4 border-b border-zinc-800/50">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-orange-500" />
                    <span className="font-semibold text-white">TALENTIX</span>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-auto p-2 space-y-6">
                  {/* Personal Section */}
                  <div className="space-y-2">
                    <h3 className="text-sm text-zinc-400 px-2">Personal</h3>
                    <div className="space-y-1">
                      <button className="flex items-center justify-between w-full px-3 py-2 text-sm text-zinc-300 rounded-md hover:bg-zinc-800/50">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          <span>Opportunities</span>
                        </div>
                        <Badge variant="secondary" className="bg-zinc-800 text-zinc-400">
                          11
                        </Badge>
                      </button>
                      <button className="flex items-center justify-between w-full px-3 py-2 text-sm text-white rounded-md bg-orange-500">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>Application</span>
                        </div>
                        <Badge variant="secondary" className="bg-orange-600 text-orange-100">
                          2
                        </Badge>
                      </button>
                    </div>
                  </div>

                  {/* Activity Section */}
                  <div className="space-y-2">
                    <h3 className="text-sm text-zinc-400 px-2">Activity</h3>
                    <div className="space-y-2">
                      {activities.map((activity, index) => (
                        <div key={index} className="p-3 rounded-md hover:bg-zinc-800/50 cursor-pointer space-y-2">
                          <div className="space-y-1">
                            <h4 className="text-sm text-zinc-200">{activity.title}</h4>
                            <p className="text-sm font-medium text-zinc-300">{activity.company}</p>
                            <p className="text-xs text-zinc-500">{activity.location}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {activity.technologies.map((tech, techIndex) => (
                              <Badge
                                key={techIndex}
                                variant="secondary"
                                className={`${
                                  tech === "React" ? "bg-orange-500/20 text-orange-500" : "bg-zinc-800 text-zinc-400"
                                }`}
                              >
                                {tech}
                              </Badge>
                            ))}
                            <Badge variant="secondary" className="bg-zinc-800 text-zinc-400">
                              +{activity.additionalCount}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* User Profile */}
                <div className="p-2 border-t border-zinc-800/50">
                  <button className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-zinc-800/50">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>SH</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-zinc-200">Saul Hudson</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-zinc-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-zinc-900 p-6 overflow-auto">
              <div className="max-w-4xl mx-auto">
                <MainContent />
              </div>
            </div>
          </div>
        </Safari>
      </div>
    </div>
  )
}

