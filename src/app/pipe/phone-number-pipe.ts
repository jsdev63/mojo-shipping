import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'phoneNumberPipe'
})

export class PhoneNumberPipe implements PipeTransform {
transform(tel, args)
    {
        if (!tel)
            return tel;

        var value = tel.toString().trim().replace(/^\+/, '');
        
        while (value.includes("-"))
        value = value.replace("-", "");
    
        while (value.includes ("("))
        value = value.replace("(","");
    
        while (value.includes (")"))
        value = value.replace(")","");
    
        while (value.includes (" "))
        value = value.replace(" ","");

        if (value.match(/[^0-9]/)) {   
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                if (String(value).substring(0, 1) == '1')
                    value = String(value).substring(1); 

                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    }
}
