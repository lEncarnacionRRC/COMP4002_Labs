export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer>
      <p>&copy; <span id="current-year">{currentYear}</span> PiXELL River Financial</p>
    </footer>
  )
}

export default Footer