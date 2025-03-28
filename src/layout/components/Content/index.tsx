import { Outlet } from 'react-router-dom'

function Content() {
  return (
    <section className="pt-[64px] min-h-full overflow-y-auto">
      <Outlet />
    </section>
  )
}

export default Content
