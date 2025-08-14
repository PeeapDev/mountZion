import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Church, Calendar, Clock, MapPin, Phone, Heart, Users, Music, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import SiteLogo from "@/components/site-logo"

export default function ChapelPage() {
  const services = [
    {
      name: "Sunday Morning Worship",
      time: "9:00 AM",
      description: "Traditional Anglican service with Holy Communion",
      frequency: "Weekly",
    },
    {
      name: "Wednesday Evening Prayer",
      time: "6:00 PM",
      description: "Midweek prayer and reflection service",
      frequency: "Weekly",
    },
    {
      name: "Friday Morning Prayer",
      time: "7:00 AM",
      description: "Start your day with prayer and meditation",
      frequency: "Weekly",
    },
    {
      name: "Special Feast Days",
      time: "Various",
      description: "Christmas, Easter, and other liturgical celebrations",
      frequency: "Seasonal",
    },
  ]

  const events = [
    {
      title: "Wedding Ceremonies",
      description: "Beautiful chapel weddings with full Anglican liturgy",
      capacity: "Up to 150 guests",
    },
    {
      title: "Baptisms & Confirmations",
      description: "Sacred sacramental services for individuals and families",
      capacity: "Family gatherings",
    },
    {
      title: "Memorial Services",
      description: "Dignified funeral and memorial services",
      capacity: "Up to 200 guests",
    },
    {
      title: "Ordination Services",
      description: "Special services for clergy ordination and commissioning",
      capacity: "Full congregation",
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
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-amber-100 text-amber-800 border-amber-200">Sacred Space for Worship</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Mount Zion
                  <span className="text-amber-700"> Chapel</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  A beautiful sanctuary dedicated to worship, prayer, and spiritual formation. Our chapel serves as the
                  heart of our campus community, welcoming all who seek to encounter God in a sacred space.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-amber-700 hover:bg-amber-800">
                    <Calendar className="mr-2 h-5 w-5" />
                    View Service Schedule
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-amber-700 text-amber-700 hover:bg-amber-50 bg-transparent"
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Book for Wedding
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg p-12 flex items-center justify-center">
                  <Church className="h-48 w-48 text-amber-600" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <Users className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">200+ Capacity</p>
                      <p className="text-sm text-gray-600">Beautiful Sacred Space</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Schedule Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Worship Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join us for regular worship services rooted in Anglican tradition and open to all
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {services.map((service, index) => (
                <Card key={index} className="border-amber-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-100 text-green-800">{service.frequency}</Badge>
                      <Clock className="h-6 w-6 text-amber-700" />
                    </div>
                    <CardTitle className="text-xl text-amber-900">{service.name}</CardTitle>
                    <CardDescription className="text-lg font-semibold text-amber-700">{service.time}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <Music className="h-12 w-12 text-amber-700 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-amber-900 mb-4">Music Ministry</h3>
                  <p className="text-amber-800 leading-relaxed">
                    Our chapel features traditional Anglican hymns, contemporary worship songs, and special musical
                    performances. We welcome musicians and singers to join our worship team.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Special Events Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Special Events & Ceremonies</h2>
              <p className="text-xl text-gray-600">Our chapel is available for life's most important moments</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {events.map((event, index) => (
                <Card key={index} className="bg-white border-amber-200 hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <Heart className="h-6 w-6 text-amber-700" />
                    </div>
                    <CardTitle className="text-xl text-amber-900">{event.title}</CardTitle>
                    <CardDescription className="text-amber-700 font-semibold">{event.capacity}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <Button className="bg-amber-700 hover:bg-amber-800">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Chapel Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Chapel Features</h2>
              <p className="text-xl text-gray-600">Modern amenities in a traditional sacred setting</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-amber-200 hover:shadow-lg transition-shadow text-center">
                <CardHeader>
                  <Music className="h-12 w-12 text-amber-700 mx-auto mb-4" />
                  <CardTitle className="text-amber-900">Sound System</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Professional audio system for clear worship and ceremony sound</p>
                </CardContent>
              </Card>

              <Card className="border-amber-200 hover:shadow-lg transition-shadow text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-amber-700 mx-auto mb-4" />
                  <CardTitle className="text-amber-900">Seating Capacity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Comfortable seating for up to 200 people with excellent acoustics</p>
                </CardContent>
              </Card>

              <Card className="border-amber-200 hover:shadow-lg transition-shadow text-center">
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-amber-700 mx-auto mb-4" />
                  <CardTitle className="text-amber-900">Prayer Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Anglican prayer books, hymnals, and devotional materials available</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-amber-50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Visit or Book Our Chapel</h2>
              <p className="text-xl text-gray-600">Contact us for service information or event bookings</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <Card className="bg-white border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900">Chapel Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-amber-100 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-2">Location</h3>
                      <p className="text-gray-600">
                        Mount Zion Training Centre Campus
                        <br />
                        Mothaim Community, Freetown, Sierra Leone
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-amber-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-2">Open Hours</h3>
                      <p className="text-gray-600">
                        Daily: 6:00 AM - 8:00 PM
                        <br />
                        Available for private prayer and meditation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-amber-100 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-2">Contact</h3>
                      <p className="text-gray-600">
                        +232 76 090 915
                        <br />
                        frontdeskmountzion@gmail.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900">Book Chapel Services</CardTitle>
                  <CardDescription>Reserve our chapel for your special event</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Event Type</label>
                    <select className="w-full p-3 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                      <option>Wedding Ceremony</option>
                      <option>Baptism/Confirmation</option>
                      <option>Memorial Service</option>
                      <option>Special Worship Service</option>
                      <option>Other Religious Ceremony</option>
                    </select>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Preferred Date</label>
                      <input
                        type="date"
                        className="w-full p-3 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Expected Guests</label>
                      <input
                        type="number"
                        className="w-full p-3 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Number of guests"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Additional Details</label>
                    <textarea
                      rows={3}
                      className="w-full p-3 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Tell us about your event requirements..."
                    ></textarea>
                  </div>
                  <Button className="w-full bg-amber-700 hover:bg-amber-800">
                    <Calendar className="mr-2 h-5 w-5" />
                    Submit Booking Request
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <SiteLogo size={40} className="w-10 h-10 brightness-0 invert" />
              <div>
                <h3 className="text-xl font-bold">Mount Zion Training Centre</h3>
                <p className="text-sm text-amber-300">Chapel Services</p>
              </div>
            </div>
            <p className="text-amber-200 mb-4">
              A sacred space for worship, prayer, and spiritual formation in the heart of West Africa.
            </p>
            <div className="border-t border-amber-800 pt-4">
              <p className="text-amber-300">
                &copy; {new Date().getFullYear()} Mount Zion Training Centre. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
