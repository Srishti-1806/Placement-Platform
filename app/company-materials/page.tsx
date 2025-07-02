"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Search,
  Download,
  FileText,
  Users,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { InteractiveCard } from "@/components/interactive-card";
import { GalaxyHover } from "@/components/galaxy-hover";
import { AuthGuard } from "@/components/auth-guard";

const companies = [
  {
    id: 1,
    name: "Google",
    logo: "🔍",
    materials: 45,
    interviews: 120,
    lastUpdated: "2 days ago",
    difficulty: "Hard",
    topics: ["System Design", "Algorithms", "Coding"],
  },
  {
    id: 2,
    name: "Microsoft",
    logo: "🪟",
    materials: 38,
    interviews: 95,
    lastUpdated: "1 week ago",
    difficulty: "Medium-Hard",
    topics: ["Coding", "Behavioral", "Technical"],
  },
  {
    id: 3,
    name: "Amazon",
    logo: "📦",
    materials: 52,
    interviews: 150,
    lastUpdated: "3 days ago",
    difficulty: "Medium-Hard",
    topics: ["Leadership", "Coding", "System Design"],
  },
];

export default function CompanyMaterialsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <AuthGuard>
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Company Materials
              </h1>
              <p className="text-xl text-gray-600">
                Access company-specific interview materials and experiences
              </p>
            </div>

            <div className="mb-8">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GalaxyHover>
                    <InteractiveCard
                      title={company.name}
                      description={`${company.materials} materials available`}
                      icon={<Building className="h-5 w-5 text-purple-400" />}
                      glowColor="purple"
                    >
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-4xl mb-2">{company.logo}</div>
                          <h3 className="font-semibold text-lg">
                            {company.name}
                          </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center">
                            <FileText className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                            <p className="font-medium">{company.materials}</p>
                            <p className="text-gray-600">Materials</p>
                          </div>
                          <div className="text-center">
                            <Users className="h-4 w-4 mx-auto mb-1 text-green-500" />
                            <p className="font-medium">{company.interviews}</p>
                            <p className="text-gray-600">Interviews</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {company.topics.map((topic, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {topic}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-3 w-3 mr-1" />
                            {company.lastUpdated}
                          </div>
                          <Badge variant="outline">{company.difficulty}</Badge>
                        </div>

                        <Button className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Access Materials
                        </Button>
                      </div>
                    </InteractiveCard>
                  </GalaxyHover>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  );
}
