function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer>
      <p>&copy; <span id="current-year">{currentYear}</span> Company Name</p>
    </footer>
  )
}

export default Footer