import { ThemeContext } from "./contexts/theme-context"
import { useEffect, useState } from "react"

import Layout from "./layout"
import axios from "axios"
import List from "./List"
import "./styles.sass"

export const App = () => {
  const isBrowserDefaulDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches

  const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem("default-theme")
    const browserDefault = isBrowserDefaulDark() ? "dark" : "light"
    return localStorageTheme || browserDefault
  }

  const [theme, setTheme] = useState(getDefaultTheme())
  const [initialLists, setInitialLists] = useState([]) // Separate state for initial data
  const [sortedLists, setSortedLists] = useState([]) // Separate state for sorted data
  const [sortOrder, setSortOrder] = useState("asc") // or 'desc'

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const baseURL = "http://localhost:3000"
        const response = await axios.get("/lists", { baseURL })
        const lists = response.data
        setInitialLists(lists)
        setSortedLists(lists) // Initialize sorted data with the initial data
      } catch (error) {
        console.error("Error fetching lists:", error.message)
      }
    }

    fetchLists()
  }, [])

  useEffect(() => {
    // Sort data by label in ascending order initially
    const sortedData = [...initialLists].sort((a, b) => {
      const labelA = a.label.toUpperCase()
      const labelB = b.label.toUpperCase()
      return labelA.localeCompare(labelB)
    })

    setSortedLists(sortedData)
  }, [initialLists])

  const sortByKey = (key) => {
    const sortedData = [...sortedLists].sort((a, b) => {
      if (key === "label") {
        const labelA = a[key].toUpperCase()
        const labelB = b[key].toUpperCase()
        return sortOrder === "asc"
          ? labelA.localeCompare(labelB)
          : labelB.localeCompare(labelA)
      } else {
        return sortOrder === "asc" ? a[key] - b[key] : b[key] - a[key]
      }
    })

    setSortedLists(sortedData)
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const getSortingIcon = (key) => {
    if (key === "label") {
      return sortOrder === "asc" ? "asc" : "desc" // Replace with your preferred icons
    } else {
      return sortOrder === "asc" ? "asc" : "desc" // Replace with your preferred icons
    }
  }

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const [defaultValue, setdefaultValue] = useState({
    label:'',
    value:''
  })

  const handleOpen = async (id) => {
    const baseURL = "http://localhost:3000"
    const response = await axios.get(`/lists/${id}`, { baseURL })
    const editableRow = response.data
    setdefaultValue(editableRow)
    setOpen(true)
  }

  const handleInputChange = (e,value, property) => {
    // Update the specified property in the state
    setdefaultValue({
      ...defaultValue,
      [property]: value
    })
  }

  const handleSubmit = async (id) => {
    // Update data

    console.log(defaultValue, "defaultValue")
    const baseURL = `http://localhost:3000/lists/${id}`
    const response = await axios.put(baseURL, defaultValue)

    if (response) {
      const baseURL = "http://localhost:3000"
      const response = await axios.get("/lists", { baseURL })
      const lists = response.data
      setInitialLists(lists)
      setSortedLists(lists) // Initialize sorted data with the initial data
    }
    console.log(response, "response.......")
    setOpen(false)
    
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        <Layout>
          <div className="content-wrapper">
            <List
              item={sortedLists}
              handleSorting={sortByKey}
              getSortingIcon={getSortingIcon}
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              defaultValue={defaultValue}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </Layout>
      </div>
    </ThemeContext.Provider>
  )
}
