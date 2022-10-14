//EVENTOS O FUNCIONALIDADES PARA TABLA CLIENTES

//Funcion limpiar campos del formulario

function limpiar_formulario(){
	//if (confirm("Esta seguro que desea limpiar el formulario? ")){
		var campoTextoID = document.getElementById("id");
		var campoTextoName = document.getElementById("name");
		var campoTextoEmail = document.getElementById("email");
		var campoTextoAge= document.getElementById("age");
		var divResultado = document.getElementById("resultado");
		
		campoTextoID.value = "";
		campoTextoName.value = "";
		campoTextoEmail.value = "";
		campoTextoAge.value = "";	
		divResultado.innerHTML = ""
		
		//Otra forma de limpiar las cajas del html
		
		/*
		$("#id").val("");
		$("#name").val("");
		$("#email").val("");
		$("#age").val("");
		*/
	//}
}

//Funcion (GET) consultar o traer toda la informacion o registro de la tabla Clientes
function consultar_todo(){
    $.ajax({
        url:"https://g0849a4797b6069-tbhpw6zjeit47vd3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client",
        type:"GET",
        datatype:"json",
		
		error: function(xhr, status){
			alert('Ha ocurrido un problema, intentalo nuevamente ' );
		},
		
		complete: function(){
			alert('Resultado de comprobacion, 200 ');
		},	
		
        success:function(json){
            //console.log(respuesta);
            //crearRespuestaCliente(respuesta.items)
			
			$("#resultado").empty();
			tabla = "<center> <table border='1'> <tr> <th>ID:</th> <th>NAME:</th> <th>EMAIL:</th> <th>AGE</th>   </tr> </tr>"
			filas = ""
			for (i=0; i<json.items.length; i++){
				filas += "<tr>";
				filas += "<td>" + json.items[i].id + "</td>";
				filas += "<td>" + json.items[i].name + "</td>";
				filas += "<td>" + json.items[i].email+ "</td>";
				filas += "<td>" + json.items[i].age + "</td>";
				filas += "<td> <button onclick='borrar_registro("+json.items[i].id+")'>Borrar</button>";//se agrega el boton y este tiene la funcion borrar registro:
				filas += "</tr>";
			}
			filas += "</table>"
			$("#resultado").append(tabla + filas + "<tr><th colspan='2'> <td>" +"</center>")
			console.log(json)
			
			
        }

    });
}



/* 
function crearRespuestaCliente(items){

    let myTable ="<table border='1'>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].email+"</td>";
        myTable+="<td>"+items[i].age+"</td>";
        myTable+="<td> <button onclick='borrarElementoRoom("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);

}
*/


function validarCampo(campoTexto){
	if(campoTexto.val() != ""){
		return true;
	}
	else{
		return false;
	}
}


//Funcion (POST) Registrar o Guardar toda la informacion en la tabla Clientes

function guardarInformacion(){
	
	if(!validarCampo($("#name"))){
		alert("Debe ingresar el nombre");
		return;
	}
	
	if(!validarCampo($("#age"))){
		alert("Debe ingresar una edad");
		return;
	}	
	
    $.ajax({
        url: "https://g0849a4797b6069-tbhpw6zjeit47vd3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client",
		
		data:{
            nombre: $("#name").val(),
			correo: $("#email").val(),
			edad: $("#age").val(),			
			
					
		},
		
		type: 'POST',
		
		dataType: 'json',
		
				
        success:function(json){		
        },
		
		error: function(xhr, status){
			if(xhr, status== 200){
				console.log("El registro se guardado con exito");
			}
			else{
				console.log("Por favor revise que los datos esten correctos");
			}
		},
		
		complete: function(){
			alert('La peticion al servidor ha sido procesada con exito, 200' );
			limpiar_formulario();
			consultar_todo();
			
		},	
    });
}




//Funcion (PUT) Editar o Actualizar registro de la tabla clientes
function editar_Informacion(){
    let myData={
        id:$("#id").val(),
		nombre:$("#name").val(),
		correo:$("#email").val(),
        edad:$("#age").val(),
		
        
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
	
	if (confirm("Esta seguro de eliminar el registro  " + $("#id").val() + "  ?")){
		
		$.ajax({
			url:"https://g0849a4797b6069-tbhpw6zjeit47vd3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client",
			type:"PUT",
			data:dataToSend,
			contentType:"application/JSON",
			datatype:"JSON",
			success:function(xhr, status){
				$("#resultado").empty();

				consultar_todo();
				alert("se ha realizado la Actualicion del registro correctamente")
			}
		});
	}
}






//Funcion (DELETE) Borrar o Eliminar registro de la tabla Clientes
function borrar_registro(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
	
	
	if (confirm("Esta seguro de eliminar el registro  " + idElemento + "  ?" )){
	
		$.ajax({
			url:"https://g0849a4797b6069-tbhpw6zjeit47vd3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client",
			type:"DELETE",
			data:dataToSend,
			contentType:"application/JSON",
			datatype:"JSON",
			
			success:function(xhr, status){
				$("#resultado").empty();
				limpiar_formulario();
				consultar_todo();
				alert("El registro se ha Eliminado correctamente.")
				
			}
		});
	}
}

//Funcion (GET) para buscar o Consultar por ID

function consultaID(id){
	if(!validarCampo(id)){
		alert("Debe ingresar ID valido a buscar"+id.attr("id"));
	
	}
	else{

		$.ajax({
			url: "https://g0849a4797b6069-tbhpw6zjeit47vd3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client"+ id.val(),
			
			type: 'GET',
			dataType: 'json',

			success: function(json){
				tabla = "<center><table border='1'>";
				filas = "";
				if (json.items.length > 0){
					console.log(json);
					$("#resultado").empty();
					filas += "<tr><th>ID:<td>" + json.items[0].id
					filas += "<tr><th>NAME:<td>" + json.items[0].name
					filas += "<tr><th>EMAIL:<td>" + json.items[0].email
					filas += "<tr><th>AGE:<td>" + json.items[0].age
					$("#resultado").append(tabla + filas + "</center>")
					
				}
				else{
					alert("El registro con ID: "+ id.val() + "No existe")
				}
				
			},

			error: function(xhr, status){
				alert('Ha ocurrido un problema Error ' );
			},
			
			complete: function(){
				alert('La peticion ha sido realizada' );
				
			}		

		});
	}
}
