export const useAddSource = async (embedding_model, mainfileType, url) => {
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/add_sources`, {
        method: "POST",
        body: JSON.stringify({
            embedding_model,
            name: mainfileType,
            value: url,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    return res

}