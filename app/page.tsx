import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Church,
  Users,
  Calendar,
  MapPin,
  Phone,
  Mail,
  BookOpen,
  Heart,
  Award,
  Building,
  DollarSign,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import AuthButton from "@/components/auth-button"

export default function HomePage() {
  const proposedCourses = [
    { name: "Entrepreneurship and Small Business Skill Acquisition", fee: 100 },
    { name: "Leadership Skills for Faith Based and Community Organizations", fee: 100 },
    { name: "Basic Counseling and Pastoral Care", fee: 75 },
    { name: "Introduction to Biblical Interpretation", fee: 75 },
    { name: "Grant Writing and Proposal Development", fee: 100 },
    { name: "Financial Literacy and Budgeting", fee: 100 },
    { name: "Public Speaking and Homiletics", fee: 75 },
    { name: "Youth Leadership Development", fee: 75 },
    { name: "Digital Tools for Ministry and Community Engagement", fee: 100 },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-green-50 border-b border-green-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Church className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-900">Mount Zion Training Centre</h1>
              <p className="text-xs text-green-700">Leadership Development • Community Training • West Africa</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#about" className="text-green-700 hover:text-green-800 font-medium">
              About
            </Link>
            <Link href="#courses" className="text-green-700 hover:text-green-800 font-medium">
              Courses
            </Link>
            <Link href="#facilities" className="text-green-700 hover:text-green-800 font-medium">
              Facilities
            </Link>
            <Link href="#contact" className="text-green-700 hover:text-green-800 font-medium">
              Contact
            </Link>
            <Link href="/signup">
              <Button className="bg-green-600 hover:bg-green-700">Enroll Now</Button>
            </Link>
            <AuthButton />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Serving Communities Across West Africa
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Empowering Leaders for
                  <span className="text-green-700"> Community Impact</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Mount Zion Training Centre is dedicated to developing leaders across faith communities, organizations,
                  and society. We provide comprehensive training in ministry, leadership, entrepreneurship, and
                  community development.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Enroll Today
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Facility
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/classroom-training.jpg"
                  alt="Mount Zion Training Centre Classroom Session"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Users className="h-6 w-6 text-green-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">1000+ Leaders Trained</p>
                      <p className="text-sm text-gray-600">Across West Africa</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Committed to excellence in leadership development, community empowerment, and transformational education
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Church className="h-6 w-6 text-green-700" />
                  </div>
                  <CardTitle className="text-green-900">Faith-Based Leadership</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Providing comprehensive training for clergy, ministry leaders, and faith-based organizations rooted
                    in Christian values and biblical principles.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-green-700" />
                  </div>
                  <CardTitle className="text-green-900">Community Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Empowering individuals and organizations with practical skills in entrepreneurship, financial
                    literacy, and community engagement.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-green-700" />
                  </div>
                  <CardTitle className="text-green-900">Leadership Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Developing transformational leaders who can create positive change in their communities,
                    organizations, and society at large.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Administrative Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Administrative Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experienced leaders dedicated to excellence in education, community development, and transformational
                leadership
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* CEO */}
              <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow text-center">
                <CardHeader className="pb-4">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <Image
                      src="/images/shellac-sonnie-davies.jpg"
                      alt="Revd. Shellac Sonnie-Davies - Chief Executive Officer"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl text-green-900">Revd. Shellac Sonnie-Davies</CardTitle>
                  <CardDescription className="text-green-700 font-semibold">Chief Executive Officer</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Providing visionary leadership and strategic direction for Mount Zion Training Centre's mission to
                    develop leaders and empower communities across West Africa.
                  </p>
                </CardContent>
              </Card>

              {/* Director of Studies */}
              <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow text-center">
                <CardHeader className="pb-4">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <Image
                      src="/images/moses-lincoln.jpg"
                      alt="Rev. Moses Lincoln - Director of Studies"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl text-green-900">Rev. Moses Lincoln</CardTitle>
                  <CardDescription className="text-green-700 font-semibold">Director of Studies</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Overseeing academic programs, curriculum development, and ensuring the highest standards of
                    educational excellence across all training initiatives.
                  </p>
                </CardContent>
              </Card>

              {/* Facilities Manager */}
              <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow text-center">
                <CardHeader className="pb-4">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <Image
                      src="/images/francis-davies.jpg"
                      alt="Mr. Francis C.O. Davies - Facilities and Logistics Manager"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl text-green-900">Mr. Francis C.O. Davies</CardTitle>
                  <CardDescription className="text-green-700 font-semibold">
                    Facilities and Logistics Manager
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Managing campus facilities, accommodation, logistics, and ensuring optimal learning environments for
                    all students and event participants.
                  </p>
                </CardContent>
              </Card>

              {/* Finance Manager */}
              <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow text-center">
                <CardHeader className="pb-4">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <Image
                      src="/images/bola-williams.jpg"
                      alt="Mr. Bola Williams - Finance Manager"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl text-green-900">Mr. Bola Williams</CardTitle>
                  <CardDescription className="text-green-700 font-semibold">Finance Manager</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Managing financial operations, budgeting, and ensuring fiscal responsibility while supporting the
                    centre's mission through sound financial stewardship.
                  </p>
                </CardContent>
              </Card>

              {/* Facilities Technician */}
              <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow text-center">
                <CardHeader className="pb-4">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                    <Users className="h-12 w-12 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-green-900">Amadu S. Bah</CardTitle>
                  <CardDescription className="text-green-700 font-semibold">Facilities Technician</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Maintaining and servicing all technical systems, equipment, and infrastructure to ensure optimal
                    facility operations and a safe learning environment for all students and staff.
                  </p>
                </CardContent>
              </Card>

              {/* Bishop's Chaplain */}
              <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow text-center">
                <CardHeader className="pb-4">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                    <Church className="h-12 w-12 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-green-900">Emmanuel Thomas</CardTitle>
                  <CardDescription className="text-green-700 font-semibold">Bishop's Chaplain</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Providing spiritual guidance, pastoral care, and chaplaincy services to the Mount Zion community
                    while supporting the Bishop's ministry and outreach initiatives.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 max-w-3xl mx-auto">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-green-900 mb-4">Committed to Excellence</h3>
                  <p className="text-green-800 leading-relaxed">
                    Our six-member administrative and technical team brings together decades of experience in education,
                    community development, and leadership training. Together, they ensure that Mount Zion Training
                    Centre maintains the highest standards in all aspects of leadership formation and community
                    empowerment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Current Courses Section */}
        <section id="courses" className="py-20 bg-green-50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Current Training Programs</h2>
              <p className="text-xl text-gray-600">
                Comprehensive programs designed for leadership and community development
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-800">Active Program</Badge>
                    <Award className="h-6 w-6 text-green-700" />
                  </div>
                  <CardTitle className="text-2xl text-green-900">Explorer Training</CardTitle>
                  <CardDescription className="text-lg">
                    Foundational program for those exploring their calling to ministry and leadership
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Biblical Studies & Theology
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Leadership Foundations
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Community Engagement
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Personal Development
                    </li>
                  </ul>
                  <Button className="w-full bg-green-700 hover:bg-green-800">Learn More</Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-800">Active Program</Badge>
                    <Award className="h-6 w-6 text-green-700" />
                  </div>
                  <CardTitle className="text-2xl text-green-900">Timothy Leadership Training</CardTitle>
                  <CardDescription className="text-lg">
                    Advanced leadership development for experienced leaders and change-makers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Advanced Leadership Studies
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Organizational Management
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Conflict Resolution
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Mentoring & Coaching
                    </li>
                  </ul>
                  <Button className="w-full bg-green-700 hover:bg-green-800">Learn More</Button>
                </CardContent>
              </Card>
            </div>

            {/* Proposed New Courses Section */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4">Coming October 2025</Badge>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Proposed New Courses</h3>
                <p className="text-lg text-gray-600">
                  Expanding our curriculum to serve diverse leadership and community development needs
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-green-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-green-900">Course</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-green-900">Fee (USD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {proposedCourses.map((course, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-gray-900">{course.name}</td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center text-green-700 font-semibold">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {course.fee}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pricing Information */}
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Users className="h-6 w-6 text-green-700" />
                      </div>
                      <CardTitle className="text-green-900">Group Enrollment Discount</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-800 mb-4">Save on group enrollments from the same organization</p>
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <p className="text-2xl font-bold text-green-700">10% OFF</p>
                      <p className="text-sm text-green-600">For groups of 5 or more students</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <GraduationCap className="h-6 w-6 text-green-700" />
                      </div>
                      <CardTitle className="text-green-900">Certification</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-800 mb-4">Official certification upon course completion</p>
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <p className="text-2xl font-bold text-green-700">$10</p>
                      <p className="text-sm text-green-600">Per certificate issued</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-12">
                <Button size="lg" className="bg-green-700 hover:bg-green-800">
                  <Calendar className="mr-2 h-5 w-5" />
                  Pre-Register for October 2025
                </Button>
                <p className="text-sm text-gray-600 mt-4">
                  Early registration opens soon. Contact us to reserve your spot.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section id="facilities" className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Facilities</h2>
              <p className="text-xl text-gray-600">Modern facilities available for various events and gatherings</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-green-200 hover:shadow-lg transition-shadow text-center">
                <CardHeader>
                  <Church className="h-12 w-12 text-green-700 mx-auto mb-4" />
                  <CardTitle className="text-green-900">Chapel Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Beautiful chapel for worship services, weddings, and spiritual gatherings
                  </p>
                  <Link href="/chapel">
                    <Button className="bg-green-700 hover:bg-green-800 text-sm">View Chapel Details</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:shadow-lg transition-shadow text-center">
                <CardHeader>
                  <Building className="h-12 w-12 text-green-700 mx-auto mb-4" />
                  <CardTitle className="text-green-900">Retreats</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Peaceful spaces for spiritual retreats and reflection</p>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:shadow-lg transition-shadow text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-green-700 mx-auto mb-4" />
                  <CardTitle className="text-green-900">Workshops</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Interactive spaces for educational workshops and training</p>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:shadow-lg transition-shadow text-center">
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-green-700 mx-auto mb-4" />
                  <CardTitle className="text-green-900">Seminars</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Professional conference facilities for seminars and lectures</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-green-200 hover:shadow-lg transition-shadow text-center">
                <CardHeader>
                  <Heart className="h-12 w-12 text-green-700 mx-auto mb-4" />
                  <CardTitle className="text-green-900">Weddings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Beautiful venues for weddings and receptions</p>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:shadow-lg transition-shadow text-center">
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-green-700 mx-auto mb-4" />
                  <CardTitle className="text-green-900">Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Extensive theological and academic library with study spaces</p>
                  <Link href="/library">
                    <Button className="bg-green-700 hover:bg-green-800 text-sm">Browse Library</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:shadow-lg transition-shadow text-center">
                <CardHeader>
                  <Building className="h-12 w-12 text-green-700 mx-auto mb-4" />
                  <CardTitle className="text-green-900">Bookshop</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Christian books, resources, and educational materials</p>
                  <Link href="/bookshop">
                    <Button className="bg-green-700 hover:bg-green-800 text-sm">Shop Books</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Facilities Gallery */}
            <div className="mt-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Facilities Gallery</h3>
                <p className="text-lg text-gray-600">
                  Take a look inside our modern facilities designed for comfort and effective learning
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Accommodation Facilities */}
                <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/images/accommodation-room-1.jpg"
                      alt="Mount Zion Training Centre Accommodation - Dormitory Room"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-green-900 mb-2">Accommodation Rooms</h4>
                    <p className="text-gray-600 text-sm">
                      Comfortable dormitory-style accommodation with quality bedding and storage facilities for students
                      and retreat participants.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/images/accommodation-room-2.jpg"
                      alt="Mount Zion Training Centre Accommodation - Room with Storage"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-green-900 mb-2">Student Quarters</h4>
                    <p className="text-gray-600 text-sm">
                      Well-appointed rooms with wardrobes, natural lighting, and comfortable furnishings for extended
                      stays during training programs.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/images/classroom-session-1.jpg"
                      alt="Mount Zion Training Centre Classroom - Students in Session"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-green-900 mb-2">Training Classrooms</h4>
                    <p className="text-gray-600 text-sm">
                      Spacious classrooms equipped for interactive learning, examinations, and group discussions with
                      natural lighting and comfortable seating.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/images/modern-classroom.jpg"
                      alt="Mount Zion Training Centre Modern Classroom - Women's Training Session"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-green-900 mb-2">Modern Training Facility</h4>
                    <p className="text-gray-600 text-sm">
                      State-of-the-art classroom with LED lighting, modern furniture, and optimal learning conditions
                      for workshops and seminars.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/images/media-studio.jpg"
                      alt="Mount Zion Training Centre Media Studio"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-green-900 mb-2">Media & Recording Studio</h4>
                    <p className="text-gray-600 text-sm">
                      Professional audio-visual facilities for recording, broadcasting, and digital media training as
                      part of our modern leadership preparation.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-xl transition-shadow flex items-center justify-center">
                  <CardContent className="p-8 text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-green-700" />
                    </div>
                    <h4 className="text-xl font-semibold text-green-900 mb-2">Book a Tour</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Schedule a visit to see our facilities in person and experience the Mount Zion difference.
                    </p>
                    <Button className="bg-green-700 hover:bg-green-800 text-sm">Schedule Visit</Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <Church className="h-24 w-24 text-green-600" />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-green-900 mb-2">Mount Zion Chapel</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Our beautiful chapel serves as the spiritual heart of the campus, hosting daily prayers, worship
                    services, weddings, and special ceremonies for the community.
                  </p>
                  <Link href="/chapel">
                    <Button className="bg-green-700 hover:bg-green-800 text-sm w-full">Visit Chapel Page</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <BookOpen className="h-24 w-24 text-blue-600" />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-green-900 mb-2">Theological Library</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Comprehensive library with over 5,000 theological texts, academic resources, and quiet study spaces
                    for research and personal development.
                  </p>
                  <Link href="/library">
                    <Button className="bg-green-700 hover:bg-green-800 text-sm w-full">Explore Library</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white border-green-200 hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                  <Building className="h-24 w-24 text-green-600" />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-green-900 mb-2">Campus Bookshop</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Well-stocked bookshop featuring Christian literature, theological texts, educational materials, and
                    resources for ministry and personal growth.
                  </p>
                  <Link href="/bookshop">
                    <Button className="bg-green-700 hover:bg-green-800 text-sm w-full">Browse Books</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="mt-16 bg-green-50 rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-green-900 mb-4">Book Our Facilities</h3>
                  <p className="text-gray-700 mb-6">
                    Our facilities are available for booking throughout the year. Whether you are planning a spiritual
                    retreat, educational workshop, corporate seminar, or special celebration, we provide the perfect
                    setting.
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Accommodation facilities available
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Chapel services and spiritual programs
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Library and study resources access
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Catering services provided
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Audio-visual equipment included
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Bookshop for educational materials
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Flexible space configurations
                    </li>
                  </ul>
                  <Button className="bg-green-700 hover:bg-green-800">
                    <Calendar className="mr-2 h-5 w-5" />
                    Check Availability
                  </Button>
                </div>
                <div>
                  <Image
                    src="/images/campus-overview.jpg"
                    alt="Mount Zion Training Centre Campus Overview"
                    width={500}
                    height={400}
                    className="rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-green-50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-xl text-gray-600">Contact us for enrollment, facility booking, or general inquiries</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="space-y-8">
                <Card className="bg-white border-green-200">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-green-700" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900 mb-2">Location</h3>
                      <p className="text-gray-600">
                        Mount Zion Training Centre
                        <br />
                        Mothaim Community Off Regent Grafton Highway
                        <br />
                        Freetown, Sierra Leone
                        <br />
                        Internal Province of West Africa
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-green-200">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-green-700" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900 mb-2">Phone</h3>
                      <p className="text-gray-600">
                        +232 76 090 915
                        <br />
                        Available: Monday - Friday, 8:00 AM - 5:00 PM
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-green-200">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-green-700" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900 mb-2">Email</h3>
                      <p className="text-gray-600">
                        frontdeskmountzion@gmail.com
                        <br />
                        info@mountziontrainingcentre.org
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900">Send us a Message</CardTitle>
                  <CardDescription>We will get back to you within 24 hours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">First Name</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Last Name</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                    <input
                      type="email"
                      className="w-full p-3 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Subject</label>
                    <select className="w-full p-3 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>Course Enrollment</option>
                      <option>Facility Booking</option>
                      <option>General Inquiry</option>
                      <option>Partnership Opportunity</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
                    <textarea
                      rows={4}
                      className="w-full p-3 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                  <Button className="w-full bg-green-700 hover:bg-green-800">Send Message</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-900 text-green-100">
        <div className="container mx-auto px-4 lg:px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Image
                  src="/images/mount-zion-logo.png"
                  alt="Mount Zion Training Centre Logo"
                  width={40}
                  height={40}
                  className="object-contain brightness-0 invert"
                />
                <div>
                  <h3 className="text-xl font-bold">Mount Zion Training Centre</h3>
                  <p className="text-sm text-green-300">Leadership Development & Community Training</p>
                </div>
              </div>
              <p className="text-green-200">
                Empowering leaders and developing communities across West Africa through comprehensive training and
                education programs.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-green-200">
                <li>
                  <Link href="#" className="hover:text-green-300">
                    Explorer Training
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-300">
                    Timothy Leadership
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-300">
                    October 2025 Courses
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Facilities</h4>
              <ul className="space-y-2 text-green-200">
                <li>
                  <Link href="#" className="hover:text-green-300">
                    Chapel Services
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-300">
                    Library
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-300">
                    Bookshop
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-300">
                    Retreats
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-300">
                    Workshops
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-300">
                    Seminars
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-300">
                    Weddings
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-green-200">
                <li>
                  <Link href="#" className="hover:text-green-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-300">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-300">
                    News & Updates
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-300">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-300">
            <p>&copy; 2025 Mount Zion Training Centre. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
