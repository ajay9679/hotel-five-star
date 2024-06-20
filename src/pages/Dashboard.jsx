import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardLayout from './../features/dashboard/DashboardLayout'
import DashboardFilter from './../features/dashboard/DashboardFilter'


export default function Dashboard(){
    return <>
        <Row type="horizontal">
            <Heading as="h1">Dashboard</Heading>
            <DashboardFilter />
        </Row>
        <DashboardLayout />
    </>
}


