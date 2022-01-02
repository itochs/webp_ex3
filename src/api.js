export async function fetchName(name) {
    const response = await fetch(
        `https://api.agify.io?name=${name}&country_id=JP`
    );
    const data = await response.json();
    return data;
}