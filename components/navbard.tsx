import { Button } from "@/components/ui/button"
import Link from "next/link"
import { User2 , BriefcaseBusiness} from "lucide-react"

const Navbard = () => {
  return (
    <header className='container mx-auto p-4 items-center justify-between flex'>
      <div>
        logo
      </div>
          


    <div className="space-x-2">
      <Button variant="secondary" size="lg" className="hover:scale-105 "><BriefcaseBusiness /><Link  href="/">Offre d'emplois</Link></Button>
       <Button size="lg" className="hover:scale-105 hover:bg-violet-900 hover:shadow-xl transition-all duration-300"><User2/> <Link href="/login" > Se connecter</Link></Button>
    </div>
    </header>
  )
}

export default Navbard
