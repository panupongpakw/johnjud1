async function fetchbookmark(): Promise<any[]>{
    const res = await fetch('http://localhost:2000/petinfo');
    return await res.json();
//ต้องการ รูป, idหมา, ชื่อหมา
}

export default {fetchbookmark};