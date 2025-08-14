import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  BookOpen,
  Star,
  DollarSign,
  Package,
  Truck,
  CreditCard,
  MapPin,
  Phone,
  Clock,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import SiteLogo from "@/components/site-logo"

export default function BookshopPage() {
  const categories = [
    {
      name: "Biblical Studies",
      count: "150+ titles",
      description: "Commentaries, concordances, and biblical reference materials",
      icon: BookOpen,
      featured: "NIV Study Bible, ESV Commentary Set",
    },
    {
      name: "Theology & Doctrine",
      count: "200+ titles",
      description: "Systematic theology, church doctrine, and theological studies",
      icon: Star,
      featured: "Calvin's Institutes, Systematic Theology by Grudem",
    },
    {
      name: "Christian Living",
      count: "120+ titles",
      description: "Devotionals, spiritual growth, and practical Christian life",
      icon: BookOpen,
      featured: "My Utmost for His Highest, Purpose Driven Life",
    },
    {
      name: "Leadership & Ministry",
      count: "80+ titles",
      description: "Church leadership, pastoral care, and ministry resources",
      icon: Package,
      featured: "The Purpose Driven Church, Leadership Gold",
    },
  ]

  const featuredBooks = [
    {
      title: "Anglican Book of Common Prayer",
      author: "Church of England",
      price: 25,
      rating: 5,
      description: "Essential liturgical resource for Anglican worship and prayer",
    },
    {
      title: "Mere Christianity",
      author: "C.S. Lewis",
      price: 15,
      rating: 5,
      description: "Classic Christian apologetics and foundational faith principles",
    },
    {
      title: "The Cost of Discipleship",
      author: "Dietrich Bonhoeffer",
      price: 18,
      rating: 5,
      description: "Profound exploration of what it means to follow Christ",
    },
    {
      title: "Knowing God",
      author: "J.I. Packer",
      price: 20,
      rating: 5,
      description: "Comprehensive guide to understanding God's character",
    },
  ]

  const services = [
    {
      title: "Online Ordering",
      description: "Browse and order books online for pickup or delivery",
      icon: ShoppingCart,
    },
    {
      title: "Special Orders",
      description: "Request specific titles not currently in stock",
      icon: Package,
    },
    {
      title: "Bulk Discounts",
      description: "Special pricing for churches and educational institutions",
      icon: DollarSign,
    },
    {
      title: "Local Delivery",
      description: "Free delivery within Freetown for orders over $50",
      icon: Truck,
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
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-green-100 text-green-800 border-green-200">Christian Literature & Resources</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Campus
                  <span className="text-green-700"> Bookshop</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Your source for Christian books, theological resources, and educational materials. We stock carefully
                  selected titles to support your spiritual growth, academic studies, and ministry development.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-green-700 hover:bg-green-800">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Browse Catalog
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-green-700 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    <Package className="mr-2 h-5 w-5" />
                    Special Orders
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-12 flex items-center justify-center">
                  <ShoppingCart className="h-48 w-48 text-green-600" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <BookOpen className="h-6 w-6 text-green-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">500+ Titles</p>
                      <p className="text-sm text-gray-600">In Stock</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Book Categories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Carefully curated collections to support your spiritual and academic journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {categories.map((category, index) => (
                <Card key={index} className="border-green-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <category.icon className="h-6 w-6 text-green-700" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-green-900">{category.name}</CardTitle>
                        <CardDescription className="text-green-700 font-semibold">{category.count}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-600">{category.description}</p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-green-800 text-sm">
                        <strong>Featured:</strong> {category.featured}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Books Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Books</h2>
              <p className="text-xl text-gray-600">
                Handpicked selections from our most popular and recommended titles
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredBooks.map((book, index) => (
                <Card key={index} className="bg-white border-green-200 hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 h-32 rounded-lg flex items-center justify-center mb-4">
                      <BookOpen className="h-16 w-16 text-green-600" />
                    </div>
                    <CardTitle className="text-lg text-green-900 line-clamp-2">{book.title}</CardTitle>
                    <CardDescription className="text-green-700">by {book.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(book.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-2xl font-bold text-green-700">
                        <DollarSign className="h-5 w-5 inline" />
                        {book.price}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3">{book.description}</p>
                    <Button className="w-full bg-green-700 hover:bg-green-800">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Bookshop Services</h2>
              <p className="text-xl text-gray-600">
                Convenient services to make your book shopping experience seamless
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="border-green-200 hover:shadow-xl transition-shadow text-center">
                  <CardHeader>
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <service.icon className="h-8 w-8 text-green-700" />
                    </div>
                    <CardTitle className="text-green-900">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Ordering Information Section */}
        <section className="py-20 bg-green-50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="bg-white border-green-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-8 w-8 text-green-700" />
                    <CardTitle className="text-2xl text-green-900">Payment & Ordering</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Payment Methods</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                        Cash (in-store)
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                        Mobile Money (Orange, Africell)
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                        Bank Transfer
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                        Credit/Debit Cards
                      </li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800 text-sm">
                      <strong>Student Discount:</strong> Mount Zion students receive 15% off all purchases with valid
                      student ID.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-green-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Truck className="h-8 w-8 text-green-700" />
                    <CardTitle className="text-2xl text-green-900">Delivery & Pickup</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Delivery Options</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                        Campus pickup (free)
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                        Freetown delivery ($5)
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                        National shipping ($15)
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                        International shipping (quote)
                      </li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800 text-sm">
                      <strong>Free Delivery:</strong> Orders over $50 qualify for free delivery within Freetown.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Visit Our Bookshop</h2>
              <p className="text-xl text-gray-600">Browse our collection in person or contact us for assistance</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <Card className="bg-white border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900">Bookshop Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900 mb-2">Location</h3>
                      <p className="text-gray-600">
                        Mount Zion Training Centre Campus
                        <br />
                        Main Building, Ground Floor
                        <br />
                        Mothaim Community, Freetown, Sierra Leone
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900 mb-2">Opening Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 8:00 AM - 6:00 PM
                        <br />
                        Saturday: 9:00 AM - 4:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900 mb-2">Contact</h3>
                      <p className="text-gray-600">
                        +232 76 090 915 (ext. 105)
                        <br />
                        bookshop@mountziontrainingcentre.org
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900">Book Request</CardTitle>
                  <CardDescription>Looking for a specific title? Let us know!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Book Title</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter book title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Author</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter author name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                    <select className="w-full p-3 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>Biblical Studies</option>
                      <option>Theology & Doctrine</option>
                      <option>Christian Living</option>
                      <option>Leadership & Ministry</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Additional Notes</label>
                    <textarea
                      rows={3}
                      className="w-full p-3 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Any additional information about the book..."
                    ></textarea>
                  </div>
                  <Button className="w-full bg-green-700 hover:bg-green-800">
                    <Package className="mr-2 h-5 w-5" />
                    Submit Book Request
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-900 text-green-100">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <SiteLogo size={40} className="w-10 h-10 brightness-0 invert" />
              <div>
                <h3 className="text-xl font-bold">Mount Zion Training Centre</h3>
                <p className="text-sm text-green-300">Campus Bookshop</p>
              </div>
            </div>
            <p className="text-green-200 mb-4">
              Your trusted source for Christian literature, theological resources, and educational materials.
            </p>
            <div className="border-t border-green-800 pt-4">
              <p className="text-green-300">
                &copy; {new Date().getFullYear()} Mount Zion Training Centre. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
