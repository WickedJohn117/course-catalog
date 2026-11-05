import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import courses from './data/courses.js'
import './App.css'

function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link className="brand" to="/">Coursecraft<span>.</span></Link>
        <div className="nav-links">
          <NavLink to="/category/Beginner" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Beginner
          </NavLink>
          <NavLink to="/category/Intermediate" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Intermediate
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

function CourseCard({ course }) {
  return (
    <Link className="course-card" to={`/courses/${course.slug}`}>
      <div className="card-topline">
        <span className={`category-badge ${course.category.toLowerCase()}`}>{course.category}</span>
        <span className="course-duration">{course.duration}</span>
      </div>
      <h2>{course.title}</h2>
      <span className="card-cta">Explore course <span aria-hidden="true">→</span></span>
    </Link>
  )
}

function CourseGrid({ items }) {
  if (items.length === 0) {
    return <p className="empty-state">No courses found in this category yet.</p>
  }

  return (
    <div className="course-grid">
      {items.map((course) => <CourseCard key={course.slug} course={course} />)}
    </div>
  )
}

function HomePage() {
  return (
    <main className="page-content">
      <section className="intro">
        <p className="eyebrow">LEARN SOMETHING NEW</p>
        <h1>Build skills.<br /><span>Make things happen.</span></h1>
        <p className="intro-copy">A collection of practical courses to help you grow your skills, one step at a time.</p>
      </section>
      <section className="catalog-section" aria-labelledby="all-courses">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE CATALOG</p>
            <h2 id="all-courses">Explore all courses</h2>
          </div>
          <span className="course-count">{courses.length} courses</span>
        </div>
        <CourseGrid items={courses} />
      </section>
    </main>
  )
}

function CategoryPage() {
  const { category = '' } = useParams()
  const matchingCourses = courses.filter(
    (course) => course.category.toLowerCase() === category.toLowerCase(),
  )
  const categoryTitle = category ? `${category.charAt(0).toUpperCase()}${category.slice(1)}` : 'All'

  return (
    <main className="page-content listing-page">
      <section className="listing-heading">
        <p className="eyebrow">BROWSE BY LEVEL</p>
        <h1>{categoryTitle} Courses</h1>
        <p className="intro-copy">Find the right course for where you are in your learning journey.</p>
      </section>
      <CourseGrid items={matchingCourses} />
    </main>
  )
}

function CourseDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const course = courses.find((item) => item.slug === slug)

  if (!course) {
    return (
      <main className="page-content detail-page">
        <button className="back-button" type="button" onClick={() => navigate(-1)}>← Go back</button>
        <section className="not-found">
          <p className="eyebrow">COURSE NOT FOUND</p>
          <h1>We couldn't find that course.</h1>
          <p className="intro-copy">The link may be incorrect, or the course may have moved.</p>
          <Link className="primary-link" to="/">Browse all courses</Link>
        </section>
      </main>
    )
  }

  return (
    <main className="page-content detail-page">
      <button className="back-button" type="button" onClick={() => navigate(-1)}>← Go back</button>
      <article className="course-detail">
        <p className="eyebrow">COURSE DETAILS</p>
        <div className="detail-meta">
          <span className={`category-badge ${course.category.toLowerCase()}`}>{course.category}</span>
          <span className="course-duration">{course.duration}</span>
        </div>
        <h1>{course.title}</h1>
        <p className="detail-description">{course.description}</p>
        <section className="topics-section">
          <h2>What you'll learn</h2>
          <ul className="topics-list">
            {course.topics.map((topic) => <li key={topic}>{topic}</li>)}
          </ul>
        </section>
      </article>
    </main>
  )
}

function NotFoundPage() {
  return (
    <main className="page-content not-found">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <Link className="primary-link" to="/">Return to the catalog</Link>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="app-shell">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses/:slug" element={<CourseDetailPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <footer className="site-footer">Thoughtful learning, at your own pace.</footer>
      </div>
    </BrowserRouter>
  )
}

export default App
