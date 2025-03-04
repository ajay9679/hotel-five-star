import React from 'react';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 2,
        padding: 0,
        flexGrow: 1,
    },
    heading: {
        fontSize: 18,
        marginBottom: 10,
        textDecoration: 'underline',
    },
    label: {
        fontSize: 12,
        marginRight: 5,
    },
    value: {
        fontSize: 12,
        marginBottom: 5
    }
});


export default function InvoicePDF({invoiceData}){
	console.log(invoiceData)
	return <Document>
		<Page pageNumber={1} size='A4' style={styles.page} >
			<View style={styles.section} >
				<Text style={styles.heading} >
					The Wild Oasis Invoice #{invoiceData.invoiceNumber}
				</Text>
				<View style={styles.section}>
                	<Text style={styles.label}>Date: {invoiceData.date}</Text>
                {/*</View>*/}
                {/*<View style={styles.section}>*/}
                    <Text style={styles.label}>Check-in Date: {invoiceData.checkInDate}</Text>
                    <Text style={styles.label}>Check-out Date: {invoiceData.checkOutDate}</Text>
                    <Text style={styles.label}>Number of Nights: {invoiceData.numberOfNights}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Guest Name:</Text>
                    <Text style={styles.value}>{invoiceData.guestName}</Text>
                    <Text style={styles.label}>Guest Email:</Text>
                    <Text style={styles.value}>{invoiceData.guestEmail}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Number of Guests:</Text>
                    <Text style={styles.value}>{invoiceData.numberOfGuests}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Room:</Text>
                    <Text style={styles.value}>{invoiceData.roomName}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Room Price:</Text>
                    <Text style={styles.value}>{invoiceData.roomPrice}</Text>
                    <Text style={styles.label}>Extras Price:</Text>
                    <Text style={styles.value}>{invoiceData.extrasPrice}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Total Price:</Text>
                    <Text style={styles.value}>{invoiceData.totalPrice}</Text>
                </View>
			</View>
		</Page>
	</Document>
}
