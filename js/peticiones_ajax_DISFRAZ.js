//EVENTOS O FUNCIONALIDADES PARA TABLA DISFRAZ


//Funcion limpiar campos del formulario

function limpiar_formulario(){
	//if (confirm("Esta seguro que desea limpiar el formulario?")){
		var campoTextoID = document.getElementById("id");
		var campoTextoBrand = document.getElementById("brand");
		var campoTextoModel = document.getElementById("model");
		var campoTextoCategory_id = document.getElementById("category_id");
		var campoTextoName = document.getElementById("name");
		var divResultado = document.getElementById("resultado");
		
		campoTextoID.value = "";
		campoTextoBrand.value = "";
		campoTextoModel.value = "";
		campoTextoCategory_id.value = "";	
		campoTextoName.value = "";
		divResultado.innerHTML = ""
		
		//Otra forma de limpiar las cajas del html
		
		/*
		$("#id").val("");
		$("#brand").val("");
		$("#model").val("");
		$("#category_id").val("");
		$("#name").val("");
		*/
	//}
}

//Funcion (GET) consultar o traer toda la informacion o registro de la tabla Disfraz
function consultar_todo(){
    $.ajax({
        url:"https://g0849a4797b6069-tbhpw6zjeit47vd3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/costume/costume",
        type:"GET",
        datatype:"json",

		error: function(xhr, status){
			alert('Ha ocurrido un problema, intentalo nuevamente '  );
		
		},
		
		complete: function(){
			alert('Resultado de comprobacion, 200 ' );
		
		},	
		
        success:function(json){
            //console.log(respuesta);
            //crearRespuestaDisfraz(respuesta.items)
			
			$("#resultado").empty();
			tabla = "<center> <table border='1'> <tr> <th>ID:</th> <th>BRAND:</th> <th>MODEL:</th> <th>CATEGORY_ID</th> <th>NAME</th>  </tr> </tr>"
			filas = ""
			for (i=0; i<json.items.length; i++){
				filas += "<tr>";
				filas += "<td>" + json.items[i].id + "</td>";
				filas += "<td>" + json.items[i].brand + "</td>";
				filas += "<td>" + json.items[i].model + "</td>";
				filas += "<td>" + json.items[i].category_id + "</td>";
				filas += "<td>" + json.items[i].name + "</td>";
				filas += "<td> <button onclick='borrar_registro("+json.items[i].id+")'>Borrar</button>";//se agrega el boton y este tiene la funcion borrar registro:
				filas += "</tr>";
			}
			filas += "</table>"
			$("#resultado").append(tabla + filas + "<tr><th colspan='2'> <td>" +  "</center>")
			console.log(json)
			
			
        }

    });
}





/* 
function crearRespuestaDisfraz(items){

    let myTable ="<table border='1'>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].brand+"</td>";
        myTable+="<td>"+items[i].model+"</td>";
        myTable+="<td>"+items[i].category_id+"</td>";
		myTable+="<td>"+items[i].name+"</td>";
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





//Funcion (POST) Registrar o Guardar toda la informacion en la tabla Dizfraz

function guardarInformacion(){
	
	if(!validarCampo($("#brand"))){
		alert("Debe ingresar la marca");
		return;
	}
	
	if(!validarCampo($("#category_id"))){
		alert("Debe ingresar la categoria");
		return;
	}	
	
    $.ajax({
        url: "https://g0849a4797b6069-tbhpw6zjeit47vd3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/costume/costume",
		
		data:{
			Brand: $("#brand").val(),
			Model: $("#model").val(),			
			Category: $("#category_id").val(),
			Name: $("#name").val(),
					
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








//Funcion (PUT) Editar o Actualizar registro de la tabla Disfraz
function editar_Informacion(){
    let myData={
        id:$("#id").val(),
		Brand:$("#brand").val(),
		Model:$("#model").val(),
        Category:$("#category_id").val(),
		Name:$("#name").val(),
        
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
	
	if (confirm("Esta seguro de eliminar el registro  " + $("#id").val() + "  ?")){
		
		$.ajax({
			url:"https://g0849a4797b6069-tbhpw6zjeit47vd3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/costume/costume",
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






//Funcion (DELETE) Borrar o Eliminar registro de la tabla Disfraz
function borrar_registro(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
	
	
	if (confirm("Esta seguro de eliminar el registro  " + idElemento + "  ?")){
	
		$.ajax({
			url:"https://g0849a4797b6069-tbhpw6zjeit47vd3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/costume/costume",
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