import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Users, Search, Download, Wifi, MapPin, Phone, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import SiteLogo from "@/components/site-logo"

export default function LibraryPage() {
  const collections = [
    {
      name: "Theological Studies",
      count: "2,500+ books",
      description: "Comprehensive collection of systematic theology, biblical studies, and church history",
      icon: BookOpen,
    },
    {
      name: "Biblical Commentaries",
      count: "800+ volumes",
      description: "Extensive commentary collection covering Old and New Testament books",
      icon: Search,
    },
    {
      name: "Leadership & Ministry",
      count: "1,200+ resources",
      description: "Practical resources for church leadership, pastoral care, and ministry development",
      icon: Users,
    },
    {
      name: "Reference Materials",
      count: "500+ items",
      description: "Dictionaries, encyclopedias, concordances, and research tools",
      icon: Download,
    },
  ]

  const services = [
    {
      title: "Study Spaces",
      description: "Quiet individual study areas and group study rooms",
      icon: BookOpen,
    },
    {
      title: "Research Assistance",
      description: "Librarian support for academic research and projects",
      icon: Search,
    },
    {
      title: "Digital Resources",
      description: "Online databases and digital theological resources",
      icon: Wifi,
    },
    {
      title: "Printing Services",
      description: "Printing and photocopying facilities for students",
      icon: Download,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-amber-50 border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SiteLogo size={48} className="w-12 h-12" />
            <div>
              <h1 className="text-xl font-bold text-amber-900">Mount Zion Training Centre</h1>
              <p className="text-xs text-amber-700">Leadership Development • Community Training • West Africa</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-amber-800 hover:text-amber-900 font-medium">
              Home
            </Link>
            <Link href="/#about" className="text-amber-800 hover:text-amber-900 font-medium">
              About
            </Link>
            <Link href="/#courses" className="text-amber-800 hover:text-amber-900 font-medium">
              Courses
            </Link>
            <Link href="/#facilities" className="text-amber-800 hover:text-amber-900 font-medium">
              Facilities
            </Link>
            <Link href="/#contact" className="text-amber-800 hover:text-amber-900 font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">Center for Learning & Research</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Theological
                  <span className="text-blue-700"> Library</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Our comprehensive theological library serves students, faculty, and the broader community with over
                  5,000 volumes, digital resources, and dedicated study spaces for academic excellence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
                    <Search className="mr-2 h-5 w-5" />
                    Browse Catalog
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-700 text-blue-700 hover:bg-blue-50 bg-transparent"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Study Room
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg p-12 flex items-center justify-center">
                  <BookOpen className="h-48 w-48 text-blue-600" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <BookOpen className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">5,000+ Books</p>
                      <p className="text-sm text-gray-600">Theological Resources</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collections Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Collections</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive theological and academic resources to support your studies and research
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {collections.map((collection, index) => (
                <Card key={index} className="border-blue-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <collection.icon className="h-6 w-6 text-blue-700" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-blue-900">{collection.name}</CardTitle>
                        <CardDescription className="text-blue-700 font-semibold">{collection.count}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{collection.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Library Services</h2>
              <p className="text-xl text-gray-600">
                Supporting your academic journey with comprehensive library services
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="bg-white border-blue-200 hover:shadow-xl transition-shadow text-center">
                  <CardHeader>
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <service.icon className="h-8 w-8 text-blue-700" />
                    </div>
                    <CardTitle className="text-blue-900">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Hours and Policies Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="border-blue-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-8 w-8 text-blue-700" />
                    <CardTitle className="text-2xl text-blue-900">Library Hours</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Monday - Friday</h4>
                      <p className="text-gray-600">7:00 AM - 9:00 PM</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Saturday</h4>
                      <p className="text-gray-600">8:00 AM - 6:00 PM</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Sunday</h4>
                      <p className="text-gray-600">2:00 PM - 8:00 PM</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Holidays</h4>
                      <p className="text-gray-600">Closed</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      <strong>Extended Hours:</strong> During exam periods, the library extends hours until 11:00 PM
                      Monday through Friday.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Users className="h-8 w-8 text-blue-700" />
                    <CardTitle className="text-2xl text-blue-900">Membership & Access</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Who Can Use the Library</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        Mount Zion students and faculty
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        Alumni with valid ID
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        Community members (reference only)
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        Visiting scholars and researchers
                      </li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      <strong>Borrowing Privileges:</strong> Students can borrow up to 10 books for 3 weeks. Faculty can
                      borrow up to 25 books for 8 weeks.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Visit Our Library</h2>
              <p className="text-xl text-gray-600">Get in touch with our library staff for assistance</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <Card className="bg-white border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Library Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Location</h3>
                      <p className="text-gray-600">
                        Mount Zion Training Centre Campus
                        <br />
                        Main Academic Building, 2nd Floor
                        <br />
                        Mothaim Community, Freetown, Sierra Leone
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Contact</h3>
                      <p className="text-gray-600">
                        +232 76 090 915 (ext. 102)
                        <br />
                        library@mountziontrainingcentre.org
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Wifi className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Amenities</h3>
                      <p className="text-gray-600">
                        Free Wi-Fi • Computer Access
                        <br />
                        Printing Services • Study Rooms
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Research Request</CardTitle>
                  <CardDescription>Need help finding specific resources?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Research Topic</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="What are you researching?"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Resource Type</label>
                    <select className="w-full p-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Books</option>
                      <option>Journal Articles</option>
                      <option>Biblical Commentaries</option>
                      <option>Reference Materials</option>
                      <option>Digital Resources</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Additional Details</label>
                    <textarea
                      rows={3}
                      className="w-full p-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Provide more details about your research needs..."
                    ></textarea>
                  </div>
                  <Button className="w-full bg-blue-700 hover:bg-blue-800">
                    <Search className="mr-2 h-5 w-5" />
                    Submit Research Request
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-blue-100">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <SiteLogo size={40} className="w-10 h-10 brightness-0 invert" />
              <div>
                <h3 className="text-xl font-bold">Mount Zion Training Centre</h3>
                <p className="text-sm text-blue-300">Theological Library</p>
              </div>
            </div>
            <p className="text-blue-200 mb-4">
              Supporting academic excellence and spiritual growth through comprehensive theological resources.
            </p>
            <div className="border-t border-blue-800 pt-4">
              <p className="text-blue-300">
                &copy; {new Date().getFullYear()} Mount Zion Training Centre. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
