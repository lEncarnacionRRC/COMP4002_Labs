document.addEventListener("DOMContentLoaded", () => {
// Array of departments along with the employees in each department
const employeeList = [
    {
        departmentName: "Administration",
        employees: [
            { firstName: "Zoë", lastName: "Robins"},
            { firstName: "Madeleine", lastName: "Madden"}
        ]
    },
    {
        departmentName: "Audit",
        employees: [
            {firstName: "Josha", lastName: "Sadowski"},
            {firstName: "Kate", lastName: "Fleetwood"}  
        ]
    },
    {
        departmentName: "Banking Operations",
        employees: [
            {firstName: "Priyanka", lastName: "Bose"},
            {firstName: "Hammed", lastName: "Animashaun"},
            {firstName: "Álvaro", lastName: "Morte"},
            {firstName: "Taylor", lastName: "Napier"},
            {firstName: "Alan", lastName: "Simmonds"}
        ]
    },
    {
        departmentName: "Communications",
        employees: [
            {firstName: "Gil", lastName: "Cardinal"},
            {firstName: "Richard J.", lastName: "Lewis"}

        ]
    },
    {
        departmentName: "Corporate Services",
        employees: [
            {firstName: "Randy", lastName: "Bradshaw"},
            {firstName: "Tracey", lastName: "Cook"},
            {firstName: "Lubomir", lastName: "Mykytiuk"}

        ]
    },
    {
        departmentName: "Facilities",
        employees: [
            {firstName: "Dakota", lastName: "House"},
            {firstName: "Lori Lea", lastName: "Okemah"},
            {firstName: "Renae", lastName: "Morrisseau"}

        ]
    },
    {
        departmentName: "Financial Services",
        employees: [
            {firstName: "Selina", lastName: "Hanusa"},
            {firstName: "Buffy", lastName: "Gaundry"},
            {firstName: "Shaneen Ann", lastName: "Fox"},
            {firstName: "Allan", lastName: "Little"},
            {firstName: "Danny", lastName: "Rabbit"}

        ]
    },
    {
        departmentName: "Human Resources",
        employees: [
            {firstName: "Jesse Ed", lastName: "Azure"},
            {firstName: "Stacy", lastName: "Da Silva"},
            {firstName: "Vladimír", lastName: "Valenta"},
            {firstName: "Samone", lastName: "Sayeses-Whitney"},
            {firstName: "Paul", lastName: "Coeur"}
        ]
    },

    {
        departmentName: "Information Technology",
        employees: [
            {firstName: "Graham", lastName: "Greene"},
            {firstName: "Sandika", lastName: "Evergreen"},
            {firstName: "Jennifer", lastName: "Rodriguez"}
        ]
    },

    {
        departmentName: "IT Technician",
        employees: [
            {firstName: "Aiyana", lastName: "Littlebear"},
            {firstName: "Inara", lastName: "Thunderbird"},
            {firstName: "Kaya", lastName: "Runningbrook"},
            {firstName: "Elara", lastName: "Firehawk"},
            {firstName: "Siona", lastName: "Moonflower"},
            {firstName: "Kaiyu", lastName: "Greywolf"},
            {firstName: "Ayawamat", lastName: "Nightwind"},
            {firstName: "Tala", lastName: "Braveheart"},
            {firstName: "Iniko", lastName: "Stonebear"},
            {firstName: "Onatah", lastName: "Redhawk"}
        ]
    }

];

// Organizing and displaying employees by department
    const employee = document.getElementById("employee-list");

    for (const department of employeeList) {
        const deptHeading = document.createElement("h3");
        deptHeading.textContent = department.departmentName;
        employee.appendChild(deptHeading);
        
        const empList = document.createElement("ul");
        
        for (const emp of department.employees) {
            const listItem = document.createElement("li");
            listItem.textContent = `${emp.firstName} ${emp.lastName}`;
            empList.appendChild(listItem);
        }
        
        employee.appendChild(empList);
    }

    document.getElementById("current-year").textContent = new Date().getFullYear();
// https://stackoverflow.com/questions/4562587/shortest-way-to-print-current-year-in-a-website#:~:text=%3Cdiv%3E%0A%20%20%20%20%26copy%3B%0A%20%20%20%20%3Cspan%20id%3D%22copyright%22%3E%0A%20%20%20%20%20%20%20%20%3Cscript%3Edocument.getElementById(%27copyright%27).appendChild(document.createTextNode(new%20Date().getFullYear()))%3C/script%3E%0A%20%20%20%20%3C/span%3E%0A%20%20%20%20Company%20Name%0A%3C/div%3E
});

