import Button from './../../ui/Button';
import { useCheckout } from './useCheckout';


export default function CheckoutButton({bookingId}){
    const {isLoading,checkout} = useCheckout();
    
    return <Button variation='primary' size='small' onClick={() => checkout(bookingId)} disabled={isLoading}>
        Check out
    </Button>
}


