import { Component } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-aircraft',
  templateUrl: './add-aircraft.component.html',
  styleUrls: ['./add-aircraft.component.css']
})
export class AddAircraftComponent {

  model = {
    aircraft : "",
    passengers :0,
    year:0
  }

  constructor(
    private apiService : ApiService
  ){
  }


  windowRef : WindowRef

  add(){
    this.apiService.addAircraft(this.model).subscribe(() => {
      this.windowRef.close()
    })
  }

  numbers = [
    { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 },
    { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 },
    { value: 11 }, { value: 12 }, { value: 13 }, { value: 14 }, { value: 15 },
    { value: 16 }, { value: 17 }, { value: 18 }, { value: 19 }, { value: 20 },
    { value: 21 }, { value: 22 }, { value: 23 }, { value: 24 }, { value: 25 },
    { value: 26 }, { value: 27 }, { value: 28 }, { value: 29 }, { value: 30 }
  ];

  years = [
    { value: 1970 }, { value: 1971 }, { value: 1972 }, { value: 1973 }, { value: 1974 },
    { value: 1975 }, { value: 1976 }, { value: 1977 }, { value: 1978 }, { value: 1979 },
    { value: 1980 }, { value: 1981 }, { value: 1982 }, { value: 1983 }, { value: 1984 },
    { value: 1985 }, { value: 1986 }, { value: 1987 }, { value: 1988 }, { value: 1989 },
    { value: 1990 }, { value: 1991 }, { value: 1992 }, { value: 1993 }, { value: 1994 },
    { value: 1995 }, { value: 1996 }, { value: 1997 }, { value: 1998 }, { value: 1999 },
    { value: 2000 }, { value: 2001 }, { value: 2002 }, { value: 2003 }, { value: 2004 },
    { value: 2005 }, { value: 2006 }, { value: 2007 }, { value: 2008 }, { value: 2009 },
    { value: 2010 }, { value: 2011 }, { value: 2012 }, { value: 2013 }, { value: 2014 },
    { value: 2015 }, { value: 2016 }, { value: 2017 }, { value: 2018 }, { value: 2019 },
    { value: 2020 }, { value: 2021 }, { value: 2022 }, { value: 2023 }
  ];

}
