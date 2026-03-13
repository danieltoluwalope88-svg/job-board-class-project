import { useState, useEffect } from 'react'
import companyLogos from './comanyLogo'
// TODO: Replace this with your hosted API URL when ready
const API_URL = 'https://jobs-api-l3e2.onrender.com/api/jobs'

function App() {
  const [jobs, setJobs] = useState([])
  const [filters, setFilters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch jobs data from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error('Failed to fetch jobs')
        }
        const data = await response.json()
        setJobs(data)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  // TODO: Write your filter logic here
  // Hint: Only show a job if ALL active filters appear in its tags
  // A job's tags = [...job.languages, ...job.tools, job.role, job.level]
  const visibleJobs = jobs.filter(job => {
    // If no filters are active, show all jobs
    if (filters.length === 0) return true

    // Check if job matches ALL active filters
    const jobTags = [job.role, job.level, ...job.languages, ...job.tools]
    return filters.every(filter => jobTags.includes(filter))
  })

  // TODO: Write handlers for adding and removing filter tags
  function handleTagClick(tag) {
    if (!filters.includes(tag)) {
      setFilters([...filters, tag])
    }
  }

  function handleRemoveFilter(tag) {
    setFilters(filters.filter(f => f !== tag))
  }

  function handleClearFilters() {
    setFilters([])
  }
  function getTagClass(tag, job) {
    if (job.languages?.includes(tag))
      return 'bg-terra-pale text-terra border border-terra/20 hover:bg-terra hover:text-white'
    if (job.tools?.includes(tag))
      return 'bg-amber-pale text-amber border border-amber/20 hover:bg-amber hover:text-white'
    return 'bg-sage-pale text-sage border border-sage/20 hover:bg-sage hover:text-white'
  }
 
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream font-body px-4">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border-t-4 border-terra w-full max-w-sm">
          <p className="text-xl font-bold text-espresso">Connection Error</p>
          <p className="text-brown-light mt-2 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-5 py-2 bg-espresso text-cream rounded-xl text-sm font-semibold hover:bg-terra transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }
 
  return (
    <div className="min-h-screen bg-cream font-body">
 
      {/* ── HEADER ── */}
      <header className="relative overflow-hidden bg-espresso flex items-end min-h-[260px] lg:min-h-[300px]">
        {/* Ink blobs */}
        <div className="absolute -top-20 -left-12 w-[280px] h-[260px] lg:w-[500px] lg:h-[420px] rounded-full blur-[50px] lg:blur-[80px] bg-terra/40 pointer-events-none" />
        <div className="absolute -top-10 right-0 w-[220px] h-[200px] lg:w-[420px] lg:h-[340px] rounded-full blur-[50px] lg:blur-[80px] bg-amber/20 pointer-events-none" />
        <div className="absolute -bottom-28 left-[30%] w-[200px] h-[300px] lg:w-[340px] lg:h-[500px] rounded-full blur-[50px] lg:blur-[80px] bg-sage/15 pointer-events-none" />
 
        <div className="relative w-full max-w-[1200px] mx-auto px-6 pt-14 pb-14 lg:px-12 lg:pt-16 lg:pb-16 lg:flex lg:items-end lg:justify-between lg:gap-10">
          {/* Left text */}
          <div>
            <p className="text-amber-light text-[11px] font-bold uppercase tracking-widest mb-5 pl-3 border-l-2 border-terra">
              247 new roles this week
            </p>
            <h1 className="font-display text-cream text-[40px] lg:text-6xl font-black leading-none tracking-tight mb-4">
              Find your next<br />
              <span className="italic text-terra-light">great role.</span>
            </h1>
            <p className="text-cream/45 text-sm lg:text-base font-light leading-relaxed max-w-xs lg:max-w-sm mb-0 lg:mb-0">
              Curated listings for developers. Filter by stack, seniority and location.
            </p>
 
            
            <div className="grid grid-cols-3 gap-4 mt-7 pt-5 border-t border-white/10 lg:hidden">
              <div>
                <span className="font-display text-cream text-[22px] font-bold block">{jobs.length}</span>
                <span className="text-[10px] text-white/35 block mt-0.5">Open roles</span>
              </div>
              <div>
                <span className="font-display text-amber-light text-[22px] font-bold block">
                  {[...new Set(jobs.map(j => j.company))].length}
                </span>
                <span className="text-[10px] text-white/35 block mt-0.5">Companies</span>
              </div>
              <div>
                <span className="font-display text-terra-light text-[22px] font-bold block">
                  {jobs.length ? Math.round((jobs.filter(j =>
                    j.location?.toLowerCase().includes('remote') ||
                    j.location?.toLowerCase().includes('worldwide')
                  ).length / jobs.length) * 100) : 0}%
                </span>
                <span className="text-[10px] text-white/35 block mt-0.5">Remote</span>
              </div>
            </div>
          </div>
 
          {/* Desktop — right column */}
          <div className="hidden lg:flex flex-col gap-4 border-l border-white/10 pl-8 min-w-[200px]">
            <div>
              <p className="text-[11px] text-white/40 font-semibold uppercase tracking-widest">Open roles</p>
              <p className="font-display text-cream text-3xl font-bold">{jobs.length}</p>
            </div>
            <div>
              <p className="text-[11px] text-white/40 font-semibold uppercase tracking-widest">Companies hiring</p>
              <p className="font-display text-amber-light text-3xl font-bold">
                {[...new Set(jobs.map(j => j.company))].length}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-white/40 font-semibold uppercase tracking-widest">Remote-friendly</p>
              <p className="font-display text-terra-light text-3xl font-bold">
                {jobs.length ? Math.round((jobs.filter(j =>
                  j.location?.toLowerCase().includes('remote') ||
                  j.location?.toLowerCase().includes('worldwide')
                ).length / jobs.length) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>
 
        {/*  bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-10 lg:h-14 overflow-hidden pointer-events-none">
          <svg viewBox="0 0 375 40" preserveAspectRatio="none" fill="#FAF7F2" className="w-full h-full lg:hidden">
            <path d="M0 40 Q187.5 0 375 40 L375 40 L0 40 Z" />
          </svg>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" fill="#FAF7F2" className="w-full h-full hidden lg:block">
            <path d="M0 56 Q720 0 1440 56 L1440 56 L0 56 Z" />
          </svg>
        </div>
      </header>
 
      {/* The Page  */}
      <main className="max-w-[1200px] mx-auto px-4 lg:px-12 pb-16 lg:pb-24">
 
        {/* ── FILTER BAR ── */}
        {filters.length > 0 && (
          <div className="relative -mt-5 lg:-mt-7 mb-8 lg:mb-12 z-10">
            <div className="bg-white rounded-2xl border border-brown/10 shadow-xl px-4 lg:px-6 py-3.5 lg:py-4">
 
              {/* Mobile design layout here */}
              <div className="lg:hidden">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-semibold text-brown-light uppercase tracking-wide">Active filters</span>
                  <button onClick={handleClearFilters} className="text-terra text-xs font-semibold underline underline-offset-2">Clear all</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.map(filter => (
                    <div key={filter} className="flex overflow-hidden rounded border border-terra/25">
                      <span className="bg-terra-pale text-terra px-2.5 py-1 text-xs font-semibold">{filter}</span>
                      <button onClick={() => handleRemoveFilter(filter)} className="bg-terra hover:bg-brown text-white px-2 text-xs font-bold transition-colors">✕</button>
                    </div>
                  ))}
                </div>
              </div>
 
              {/* Desktop design layout*/}
              <div className="hidden lg:flex items-center gap-4 flex-wrap">
                <div className="flex items-center justify-center w-9 h-9 bg-terra-pale rounded-xl flex-shrink-0">
                  <svg viewBox="0 0 16 16" fill="none" stroke="#C4622D" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
                    <line x1="2" y1="4" x2="14" y2="4" />
                    <line x1="4" y1="8" x2="12" y2="8" />
                    <line x1="6" y1="12" x2="10" y2="12" />
                  </svg>
                </div>
                <div className="w-px h-6 bg-brown/10 flex-shrink-0" />
                <div className="flex flex-wrap gap-2 flex-1">
                  {filters.map(filter => (
                    <div key={filter} className="flex overflow-hidden rounded border border-terra/25">
                      <span className="bg-terra-pale text-terra px-3 py-1.5 text-[13px] font-semibold">{filter}</span>
                      <button onClick={() => handleRemoveFilter(filter)} className="bg-terra hover:bg-brown text-white px-2.5 text-[13px] font-bold transition-colors border-l border-terra/30">✕</button>
                    </div>
                  ))}
                </div>
                <button onClick={handleClearFilters} className="ml-auto text-brown-light hover:text-terra text-[13px] font-semibold underline underline-offset-2 decoration-sand transition-colors">
                  Clear all
                </button>
              </div>
 
            </div>
          </div>
        )}
 
        {/* ── SECTION HEADING ── */}
        <div className="flex items-center justify-between lg:gap-4 mb-5 lg:mb-7 mt-6 lg:mt-10">
          <h2 className="font-display text-brown text-lg lg:text-xl font-bold whitespace-nowrap">Open positions</h2>
          <div className="hidden lg:block flex-1 h-px bg-gradient-to-r from-brown/20 to-transparent" />
          <span className="text-xs lg:text-[13px] text-brown-light whitespace-nowrap">
            <span className="font-display font-bold text-terra">{visibleJobs.length}</span> found
          </span>
        </div>
 
        {/* ── LISTINGS ── */}
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-white p-5 lg:p-7 rounded-2xl border border-brown/10 animate-pulse">
                <div className="h-4 bg-parchment rounded w-1/4 mb-4" />
                <div className="h-4 bg-parchment rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 lg:gap-3.5">
            {visibleJobs.map(job => (
              <div
                key={job.id}
                className={`bg-white rounded-2xl border relative overflow-hidden transition-all duration-200 hover:shadow-lg
                  ${job.featured
                    ? 'border-amber/20'
                    : 'border-brown/10 hover:border-terra/25'
                  }`}
              >
                {/* Mobile featured — top bar */}
                {job.featured && (
                  <div className="lg:hidden absolute top-0 left-5 right-5 h-[2px] bg-gradient-to-r from-transparent via-amber to-terra rounded" />
                )}
 
                {/* Desktop featured — left bar */}
                {job.featured && (
                  <div className="hidden lg:block absolute left-0 top-4 bottom-4 w-[3px] bg-gradient-to-b from-amber to-terra rounded-r" />
                )}
 
                {/* ── MOBILE CARD LAYOUT ── */}
                <div className="lg:hidden px-[18px] pt-5 pb-4">
                  {/* Logo */}
                  <div className="mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border border-brown/10 shadow-sm"
                      style={{ backgroundColor: job.logoColor }}
                    >
                      {job.logo}
                    </div>
                  </div>
 
                  {/* Company + badges */}
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-[11px] font-semibold text-brown-light uppercase tracking-wide">{job.company}</span>
                    {job.isNew && <span className="bg-[#EEF9F1] text-[#2D7A47] border border-[#2D7A47]/20 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">New</span>}
                    {job.featured && <span className="bg-amber-pale text-amber border border-amber/25 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">Featured</span>}
                  </div>
 
                  {/* Title */}
                  <h2 className="font-display text-espresso text-base font-bold mb-2 tracking-tight leading-snug">
                    {job.position}
                  </h2>
 
                  {/* Meta pills */}
                  <div className="flex items-center gap-1.5 flex-wrap mb-3.5 pb-3.5 border-b border-brown/8">
                    <span className="bg-parchment border border-brown/10 text-brown-light text-[11px] px-2 py-0.5 rounded-md">{job.contract}</span>
                    <span className="bg-parchment border border-brown/10 text-brown-light text-[11px] px-2 py-0.5 rounded-md">{job.location}</span>
                    <span className="bg-parchment border border-brown/10 text-brown-light text-[11px] px-2 py-0.5 rounded-md">{job.level}</span>
                  </div>
 
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3.5">
                    {[job.role, job.level, ...job.languages, ...job.tools].map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded cursor-pointer transition-all duration-150 ${getTagClass(tag, job)}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
 
                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-sand">{job.postedAt}</span>
                    <button className="inline-flex items-center gap-1.5 bg-espresso text-cream text-[11px] font-semibold px-3.5 py-1.5 rounded-lg shadow-sm whitespace-nowrap hover:bg-terra transition-all duration-150">
                      Apply
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="w-2.5 h-2.5">
                        <path d="M2 6h8M6 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
 
                {/* ── DESKTOP CARD LAYOUT ── */}
                <div className={`hidden lg:flex lg:items-center gap-5 px-7 py-6 ${job.featured ? 'pl-9' : ''}`}>
                  {/* Logo */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm border border-brown/10"
                    style={{ backgroundColor: job.logoColor }}
                  >
                    {job.logo}
                  </div>
 
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-[12px] font-semibold text-brown-light uppercase tracking-wide">{job.company}</span>
                      {job.isNew && <span className="bg-[#EEF9F1] text-[#2D7A47] border border-[#2D7A47]/20 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">New</span>}
                      {job.featured && <span className="bg-amber-pale text-amber border border-amber/25 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">Featured</span>}
                    </div>
                    <h2 className="font-display text-espresso text-lg font-bold mb-2.5 tracking-tight hover:text-terra transition-colors">
                      {job.position}
                    </h2>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="bg-parchment border border-brown/10 text-brown-light text-[12px] px-2.5 py-0.5 rounded-md">{job.location}</span>
                      <span className="bg-parchment border border-brown/10 text-brown-light text-[12px] px-2.5 py-0.5 rounded-md">{job.contract}</span>
                      <span className="bg-parchment border border-brown/10 text-brown-light text-[12px] px-2.5 py-0.5 rounded-md">{job.level}</span>
                    </div>
                  </div>
 
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 items-center lg:max-w-[280px] lg:justify-end">
                    {[job.role, job.level, ...job.languages, ...job.tools].map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`text-[12px] font-semibold px-3 py-1 rounded cursor-pointer transition-all duration-150 ${getTagClass(tag, job)}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
 
                  {/* Divider */}
                  <div className="w-px self-stretch bg-brown/10 mx-1" />
 
                  {/* Right */}
                  <div className="flex flex-col items-end gap-2.5 flex-shrink-0">
                    <span className="text-[12px] text-sand">{job.postedAt}</span>
                    <button className="inline-flex items-center gap-1.5 bg-espresso text-cream text-[12px] font-semibold px-4 py-2 rounded-xl shadow-sm whitespace-nowrap hover:bg-terra transition-all duration-150">
                      Apply now
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                        <path d="M2 6h8M6 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
 
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
 
export default App
