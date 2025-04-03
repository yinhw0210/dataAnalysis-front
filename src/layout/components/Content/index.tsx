import { Outlet } from 'react-router-dom'
import Footer from '../Footer'

function Content() {
  return (
    <section className="pt-[64px] min-h-full overflow-y-auto">
      <Outlet />
      <Footer />
    </section>
  )
}

export default Content
