const getConfiguration = () => (
    {
        headers: {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
    }
)

export default getConfiguration