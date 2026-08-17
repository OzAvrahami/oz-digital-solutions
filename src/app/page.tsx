import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import WhyMe from '@/components/sections/WhyMe'
import Process from '@/components/sections/Process'
import Portfolio from '@/components/sections/Portfolio'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main className="bg-[#060b14] text-[#f1f5f9] overflow-x-hidden">
      <Header />
      <Hero />
      <Services />
      <WhyMe />
      <Process />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
