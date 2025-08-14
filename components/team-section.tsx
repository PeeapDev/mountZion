"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Church, Users } from "lucide-react"
import EditableText from "@/components/editable-text"
import EditableImage from "@/components/editable-image"

export default function TeamSection() {
  const [tab, setTab] = useState<"bishops" | "administrative">("bishops")

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-8">
          <EditableText
            id="home.team.heading"
            as="h2"
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2"
            defaultValue={tab === "bishops" ? "Our Bishops" : "Our Administrative Team"}
          />
          <EditableText
            id="home.team.blurb"
            as="p"
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            defaultValue="Experienced leaders dedicated to excellence in education, community development, and transformational leadership"
          />
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-md shadow-sm border border-green-200 overflow-hidden">
            <button
              type="button"
              onClick={() => setTab("bishops")}
              className={`px-4 py-2 text-sm font-medium ${
                tab === "bishops" ? "bg-green-600 text-white" : "bg-white text-green-700 hover:bg-green-50"
              }`}
            >
              Bishops
            </button>
            <button
              type="button"
              onClick={() => setTab("administrative")}
              className={`px-4 py-2 text-sm font-medium border-l border-green-200 ${
                tab === "administrative" ? "bg-green-600 text-white" : "bg-white text-green-700 hover:bg-green-50"
              }`}
            >
              Administrative
            </button>
          </div>
        </div>

        {tab === "bishops" ? (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-white border-green-200 hover:shadow-xl transition-shadow text-center">
                <CardHeader className="pb-4">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gray-100">
                    <EditableImage
                      id={`home.team.bishops.${i + 1}.photo`}
                      defaultSrc="/images/placeholder-avatar.png"
                      alt={`Bishop ${i + 1}`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      rounded
                    />
                  </div>
                  <EditableText id={`home.team.bishops.${i + 1}.name`} as="h3" className="text-xl text-green-900" defaultValue={`Bishop ${i + 1}`} />
                  <EditableText id={`home.team.bishops.${i + 1}.role`} as="p" className="text-green-700 font-semibold" defaultValue="Bishop" />
                </CardHeader>
                <CardContent>
                  <EditableText
                    id={`home.team.bishops.${i + 1}.desc`}
                    as="p"
                    className="text-gray-600 text-sm leading-relaxed"
                    defaultValue="Brief biography or description about this bishop."
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* CEO */}
            <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow text-center">
              <CardHeader className="pb-4">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  <EditableImage id="home.team.ceo.photo" defaultSrc="/images/shellac-sonnie-davies.jpg" alt="Revd. Shellac Sonnie-Davies - Chief Executive Officer" width={96} height={96} className="w-full h-full object-cover" rounded />
                </div>
                <EditableText id="home.team.ceo.name" as="h3" className="text-xl text-green-900" defaultValue="Revd. Shellac Sonnie-Davies" />
                <EditableText id="home.team.ceo.role" as="p" className="text-green-700 font-semibold" defaultValue="Chief Executive Officer" />
              </CardHeader>
              <CardContent>
                <EditableText id="home.team.ceo.desc" as="p" className="text-gray-600 text-sm leading-relaxed" defaultValue="Providing visionary leadership and strategic direction for Mount Zion Training Centre's mission to develop leaders and empower communities across West Africa." />
              </CardContent>
            </Card>

            {/* Director of Studies */}
            <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow text-center">
              <CardHeader className="pb-4">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  <EditableImage id="home.team.director.photo" defaultSrc="/images/moses-lincoln.jpg" alt="Rev. Moses Lincoln - Director of Studies" width={96} height={96} className="w-full h-full object-cover" rounded />
                </div>
                <EditableText id="home.team.director.name" as="h3" className="text-xl text-green-900" defaultValue="Rev. Moses Lincoln" />
                <EditableText id="home.team.director.role" as="p" className="text-green-700 font-semibold" defaultValue="Director of Studies" />
              </CardHeader>
              <CardContent>
                <EditableText id="home.team.director.desc" as="p" className="text-gray-600 text-sm leading-relaxed" defaultValue="Overseeing academic programs, curriculum development, and ensuring the highest standards of educational excellence across all training initiatives." />
              </CardContent>
            </Card>

            {/* Facilities Manager */}
            <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow text-center">
              <CardHeader className="pb-4">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  <EditableImage id="home.team.facilities.photo" defaultSrc="/images/francis-davies.jpg" alt="Mr. Francis C.O. Davies - Facilities and Logistics Manager" width={96} height={96} className="w-full h-full object-cover" rounded />
                </div>
                <EditableText id="home.team.facilities.name" as="h3" className="text-xl text-green-900" defaultValue="Mr. Francis C.O. Davies" />
                <EditableText id="home.team.facilities.role" as="p" className="text-green-700 font-semibold" defaultValue="Facilities and Logistics Manager" />
              </CardHeader>
              <CardContent>
                <EditableText id="home.team.facilities.desc" as="p" className="text-gray-600 text-sm leading-relaxed" defaultValue="Managing campus facilities, accommodation, logistics, and ensuring optimal learning environments for all students and event participants." />
              </CardContent>
            </Card>

            {/* Finance Manager */}
            <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow text-center">
              <CardHeader className="pb-4">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  <EditableImage id="home.team.finance.photo" defaultSrc="/images/bola-williams.jpg" alt="Mr. Bola Williams - Finance Manager" width={96} height={96} className="w-full h-full object-cover" rounded />
                </div>
                <EditableText id="home.team.finance.name" as="h3" className="text-xl text-green-900" defaultValue="Mr. Bola Williams" />
                <EditableText id="home.team.finance.role" as="p" className="text-green-700 font-semibold" defaultValue="Finance Manager" />
              </CardHeader>
              <CardContent>
                <EditableText id="home.team.finance.desc" as="p" className="text-gray-600 text-sm leading-relaxed" defaultValue="Managing financial operations, budgeting, and ensuring fiscal responsibility while supporting the centre's mission through sound financial stewardship." />
              </CardContent>
            </Card>

            {/* Facilities Technician */}
            <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow text-center">
              <CardHeader className="pb-4">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <Users className="h-12 w-12 text-green-600" />
                </div>
                <EditableText id="home.team.tech.name" as="h3" className="text-xl text-green-900" defaultValue="Amadu S. Bah" />
                <EditableText id="home.team.tech.role" as="p" className="text-green-700 font-semibold" defaultValue="Facilities Technician" />
              </CardHeader>
              <CardContent>
                <EditableText id="home.team.tech.desc" as="p" className="text-gray-600 text-sm leading-relaxed" defaultValue="Maintaining and servicing all technical systems, equipment, and infrastructure to ensure optimal facility operations and a safe learning environment for all students and staff." />
              </CardContent>
            </Card>

            {/* Bishop's Chaplain */}
            <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow text-center">
              <CardHeader className="pb-4">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <Church className="h-12 w-12 text-green-600" />
                </div>
                <EditableText id="home.team.chaplain.name" as="h3" className="text-xl text-green-900" defaultValue="Emmanuel Thomas" />
                <EditableText id="home.team.chaplain.role" as="p" className="text-green-700 font-semibold" defaultValue="Bishop's Chaplain" />
              </CardHeader>
              <CardContent>
                <EditableText id="home.team.chaplain.desc" as="p" className="text-gray-600 text-sm leading-relaxed" defaultValue="Providing spiritual guidance, pastoral care, and chaplaincy services to the Mount Zion community while supporting the Bishop's ministry and outreach initiatives." />
              </CardContent>
            </Card>
          </div>
        )}

        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 max-w-3xl mx-auto">
            <CardContent className="p-8 text-center">
              <EditableText id="home.team.commit.heading" as="h3" className="text-2xl font-bold text-green-900 mb-4" defaultValue="Committed to Excellence" />
              <EditableText id="home.team.commit.text" as="p" className="text-green-800 leading-relaxed" defaultValue="Our six-member administrative and technical team brings together decades of experience in education, community development, and leadership training. Together, they ensure that Mount Zion Training Centre maintains the highest standards in all aspects of leadership formation and community empowerment." />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
