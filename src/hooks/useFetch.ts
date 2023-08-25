export default function useFetch() {
    const request = async (url: string) => {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    return { request };
}